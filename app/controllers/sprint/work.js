import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  inProgressBugs: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      return bugs.filterBy('isInProgress', true);
    }
  }.property('model.bugs.length'),
  
  doneBugs: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      return bugs.filterBy('isDone', true);
    }
  }.property('model.bugs.length'),
  
  toDoBugs: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      return bugs.filterBy('isToDo', true);
    }
  }.property('model.bugs.length'),
  
  showBugSidebar: function() {
    return this.get('controllers.application.currentPath') === 'sprint.work.bug';
  }.property('controllers.application.currentPath')
  
});
