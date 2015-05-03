import Ember from 'ember';

export default Ember.Controller.extend({

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
  }.property('model.bugs.length')
  
});
