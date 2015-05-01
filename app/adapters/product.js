import ApplicationAdapter from './application';
import Ember from 'ember';


//
// findAll 
//
var findAll = function (store, type) {
  var self = this;
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    Ember.$.ajax({
      url: self.get('host') + '/jsonrpc.cgi?method=Product.get_accessible_products',
      dataType: 'jsonp',
      context: store,
      error: function(xhr, ajaxOptions, thrownError) {
        reject(thrownError);
      },
      success: function(response) {
        if (response.error) {
          reject(response.error);
          return;
        }
        
        var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Product.get&params=[{"ids":[' + response.result.ids + ']}]';
        Ember.$.ajax({
          url: url,
          dataType: 'jsonp',
          context: store,
          error: function(xhr, ajaxOptions, thrownError) {
            reject(thrownError);
          },
          success: function(response) {
            if (response.error) {
              reject(response.error);
              return;
            }
            resolve({products:response.result.products});
          }
        });
        
      }
    });
  });
  return promise;
};


export default ApplicationAdapter.extend({
  findAll: findAll
});
