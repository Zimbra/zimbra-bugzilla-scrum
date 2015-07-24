import Ember from 'ember';

export default Ember.Controller.extend({

  doneBugs_: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      return bugs.filterBy('isDone', true);
    }
  }.property('model.bugs.length'),
  
  doneBugs: Ember.computed.sort('doneBugs_', function(a, b) {
    var sort = ['CLOSED', 'VERIFIED', 'RESOLVED'];
    return sort.indexOf(Ember.get(a, 'status')) - sort.indexOf(Ember.get(b, 'status')); 
  }),
  
  toDoBugs_: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      return bugs.filterBy('isDone', false);
    }
  }.property('model.bugs.length'),
  
  toDoBugs: Ember.computed.sort('toDoBugs_', function(a, b) {
    // Primary sort by priority
    var aPriority = Ember.get(a, 'priority');
    var bPriority = Ember.get(b, 'priority');
    if (aPriority && bPriority) {
      var x = aPriority.localeCompare(bPriority);
      if (x !== 0) {
        return x;
      }
    }
    
    // Secondary sort by progression of status
    var sort = ['IN_PROGRESS', 'REOPENED', 'ASSIGNED', 'NEW'];
    return sort.indexOf(Ember.get(a, 'status')) - sort.indexOf(Ember.get(b, 'status')); 
  })
  
});
