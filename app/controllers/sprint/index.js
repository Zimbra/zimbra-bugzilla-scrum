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
  
  toDoBugs: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      return bugs.filterBy('isToDo', true);
    }
  }.property('model.bugs.length')
  
});
