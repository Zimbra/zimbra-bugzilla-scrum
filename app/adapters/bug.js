import ApplicationAdapter from './application';
import DS from 'ember-data';
import Ember from 'ember';

var include_fields = ['assigned_to','component','creation_time','creator','id','keywords','last_change_time','priority','resolution','status','summary'];

//
// find 
//
var find = function (store, type, id, snapshot) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var params = {id:id};
    //params.include_fields = include_fields;
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.search&params=[' + JSON.stringify(params) + ']';
    //console.log('** url', url);
    Ember.$.ajax({
      url: url,
      dataType: 'jsonp',
      context: store,
      error: function(xhr, ajaxOptions, thrownError) {
        reject(thrownError);
      },
      success: function(response) {
        //console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          reject(response.error);
          return;
        }
        var bug = response.result.bugs[0];
        resolve({bug:bug});
      }
    });
  });
};


//
// findAll 
//
var findAll = function (store, type) {
  return findQuery(store, type, {});
};


//
// findQuery
//
var findQuery = function (store, type, query) {
  console.log('** findQuery', JSON.stringify(query));
  
  // 1st-pass query fetches ids & keywords only, to apply the sprint filter based on keywords
  var params = _.clone(query);
  delete params.keyword;
  delete params.keywords;
  //params.limit = 100000;
  params.target_milestone = 'Kiss';
  params.include_fields = ['id','keywords'];
  var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.search&params=[' + JSON.stringify(params) + ']';
  console.log('** url', url);
  var self = this;
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    Ember.$.ajax({
      url: url,
      dataType: 'jsonp',
      context: store,
      error: function(xhr, ajaxOptions, thrownError) {
        reject(thrownError);
      },
      success: function(response) {
        //console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          reject(response.error);
          return;
        }
        console.log('** $.ajax returns ' + response.result.bugs.length + ' bugs');
        var filtered = _.filter(response.result.bugs, function(bug) {
          if (query.keywords) {
            return _.contains(bug.keywords, query.keywords);
          } else {
            return true;
          }
        });
        console.log('** filtered $.ajax returns ' + filtered.length + ' bugs');
        
        // 2nd-pass query fetches the rest of the fields
        params = {id:_.pluck(filtered,'id')};
        params.include_fields = include_fields;
        url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.search&params=[' + JSON.stringify(params) + ']';
        console.log('** url', url);
        Ember.$.ajax({
          url: url,
          dataType: 'jsonp',
          context: store,
          error: function(xhr, ajaxOptions, thrownError) {
            reject(thrownError);
          },
          success: function(response) {
            //console.log('** $.ajax returns', JSON.stringify(response));
            if (response.error) {
              reject(response.error);
              return;
            }
            resolve({bugs:response.result.bugs});
          }
        });
      }
    });
  });
  return promise;
};


export default ApplicationAdapter.extend({
  find: find,
  findAll: findAll,
  findQuery: findQuery
});
