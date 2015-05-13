import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  
  isOverview: function() {
    return this.get('controllers.application.currentPath') === 'sprint.index';
  }.property('controllers.application.currentPath'),
  
  isPlan: function() {
    return this.get('controllers.application.currentPath') === 'sprint.plan';
  }.property('controllers.application.currentPath'),
  
  isWork: function() {
    var s = this.get('controllers.application.currentPath');
    return (typeof s !== 'undefined' && s.indexOf('sprint.work') === 0);
  }.property('controllers.application.currentPath')
  
});
