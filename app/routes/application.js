import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import sprintData from '../sprintData';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function() {
    var self = this;
    _(sprintData).forEachRight(function(sprint) {
      self.store.push('sprint', sprint);
    });
  }
});
