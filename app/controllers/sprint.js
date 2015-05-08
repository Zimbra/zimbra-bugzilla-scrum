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
    return this.get('controllers.application.currentPath') === 'sprint.work';
  }.property('controllers.application.currentPath')
  
});
