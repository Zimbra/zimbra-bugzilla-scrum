import AuthenticatorBase from 'simple-auth/authenticators/base';

export default AuthenticatorBase.extend({

  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve(data);
    });
  },
  
  authenticate: function(opts) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var params = {Bugzilla_login:opts.identification, Bugzilla_password:opts.password, names:[opts.identification]};
      var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=User.get&params=[' + JSON.stringify(params) + ']';
      console.log('GET', url);
      Ember.$.ajax({
        url: url,
        dataType: 'jsonp',
        context: self,
        error: function(xhr, ajaxOptions, thrownError) {
          reject(thrownError);
        },
        success: function(response) {
          //console.log('** $.ajax returns', JSON.stringify(response));
          if (response.error) {
            reject(response.error);
          } else {
            var user = response.result.users[0];
            resolve(user);
            
          }
        }
      });
    });
  },
  
  invalidate: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve();
    });
  }
  
}); 