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
  
  showSidebar: function() {
    var currentPath = this.get('controllers.application.currentPath');
    if (currentPath) {
      return currentPath.indexOf('sprint.work.') > -1 && currentPath.indexOf('sprint.work.index') == -1;
    }
  }.property('controllers.application.currentPath'),
  
  actions: {
    resolve: function(bugId) {
      this.transitionToRoute('sprint.work.resolve', bugId);
    }
  }
  
});
