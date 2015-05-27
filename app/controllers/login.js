import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';


export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:bugzilla-authenticator',
  showSpin: false,
  actions: {
    authenticate: function() {
      var self = this;
      this.set('showSpin', true);
      this._super().then(function() {
        self.set('showSpin', false);
        self.set('errorMessage', null);
        self.transitionToRoute('index');
      }, function(err) {
        console.log('Authenticate failed', err);
        self.set('showSpin', false);
        self.set('errorMessage', err.message);
      });
    }
  }
});
