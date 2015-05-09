import ApplicationAdapter from './application';
import DS from 'ember-data';
import Ember from 'ember';


//
// findAll 
//
var findAll = function (store, type) {
  return findQuery(store, type, {});
};


//
// find 
//
var find = function (store, type, id, snapshot) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var params = {comment_ids:[id]};
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.comments&params=[' + JSON.stringify(params) + ']';
    console.log('GET', url);
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
        var comment = response.result.comments[id];
        resolve({comment:comment});
      }
    });
  });
};


//
// findQuery
//
var findQuery = function (store, type, query) {
  console.log('** findQuery', JSON.stringify(query));
  
  // 1st-pass query fetches ids & keywords only, to apply the sprint filter based on keywords
  var params = _.clone(query);
  var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.comments&params=[' + JSON.stringify(params) + ']';
  console.log('GET', url);
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
        console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          reject(response.error);
          return;
        }
        console.log('** $.ajax returns ' + response.result.comments.length + ' comments');
        resolve({comments:response.result.comments});
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
