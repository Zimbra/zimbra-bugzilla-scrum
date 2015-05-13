import Ember from 'ember';
import sprintData from '../sprintData';

export default Ember.Route.extend({
  model: function() {
    var self = this;
    _(sprintData).forEachRight(function(sprint) {
      self.store.push('sprint', sprint);
    });
  }
});
