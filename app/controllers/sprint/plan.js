import Ember from 'ember';

export default Ember.Controller.extend({
  
  storyPointsTotalSum: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      var total = 0;
      bugs.forEach(function(bug) {
        total += bug.get('storyPointsTotal');
      });
      return total;
    }
  }.property('model.bugs.@each.storyPointsTotal')
});
