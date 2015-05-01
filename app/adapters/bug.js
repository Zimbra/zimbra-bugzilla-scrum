import ApplicationAdapter from './application';
import DS from 'ember-data';
import Ember from 'ember';


//
// findAll 
//
var findAll = function (store, type) {
  var self = this;
  var url = self.get('host') + '/jsonrpc.cgi?method=Bug.search&params=[{"limit":10,"target_milestone":"Kiss"}]';
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
        resolve({bugs:response.result.bugs});
      }
    });
  });
  return promise;
};


export default ApplicationAdapter.extend({
  findAll: findAll
});
