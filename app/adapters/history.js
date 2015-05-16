import ApplicationAdapter from './application';
import DS from 'ember-data';
import Ember from 'ember';


//
// find 
//
var find = function (store, type, id, snapshot) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var params = {ids:[id]};
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.history&params=[' + JSON.stringify(params) + ']';
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
        } else {
          var history = _.find(response.result.bugs, function(bug) {
            return bug.id == id;
          }).history;
          var result = [];
          _(history).forEachRight(function(entry) {
            var seq = 1;
            _(entry.changes).forEachRight(function(change) {
              var syntheticId = 1000 * new Date(entry.when).getTime() + seq++;
              result.push({id:syntheticId, who:entry.who, when:entry.when, bug:id, added:change.added, field_name:change.field_name, removed:change.removed});
            });
          });
          resolve({historys:result});
        }
      }
    });
  });
};


export default ApplicationAdapter.extend({
  find: find
});
