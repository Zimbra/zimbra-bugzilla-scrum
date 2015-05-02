import Ember from 'ember';

export default Ember.Controller.extend({

  inProgressBugs: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      return bugs.filterBy('status', 'IN_PROGRESS');
    }
  }.property('model.bugs.length'),
  
  doneBugs: function() {
    var bugs = this.get('model.bugs');
    if (!bugs) {return;}
    return bugs.filterBy('status', 'RESOLVED');
  }.property('model.bugs.length'),
  
  toDoBugs: function() {
    var bugs = this.get('model.bugs');
    if (!bugs) {return;}
    return bugs.filter(function(bug) {
      var status = bug.get('status');
      if (status === 'ASSIGNED') {
        return true;
      }
      return false;
    });
  }.property('model.bugs.length')
});
