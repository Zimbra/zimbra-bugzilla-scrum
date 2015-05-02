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
// findQuery
//
var findQuery = function (store, type, query) {
  var self = this;
  query = {};
  query.product='ZCS';
  query.limit = 2000;
  query.target_milestone = 'Kiss';
  //query.keywords = ['S17'];
  delete query.keyword;
  var url = this.get('host') + '/jsonrpc.cgi?method=Bug.search&params=[' + JSON.stringify(query) + ']';
  console.log('** url', url);
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
        resolve({bugs:response.result.bugs});
      }
    });
  });
  return promise;
};


export default ApplicationAdapter.extend({
  findQuery: findQuery
});
