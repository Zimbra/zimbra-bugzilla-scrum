import DS from 'ember-data';

export default DS.Model.extend({
  begin: DS.attr('date'),
  end: DS.attr('date'),
  
  prev: function() {
    return this.store.find('sprint', Number(this.get('id')) - 1);
  }.property('id'),
  
  next: function() {
    return this.store.find('sprint', Number(this.get('id')) + 1);
  }.property('id'),
  
  name: function() {
    return 'S' + this.get('id');
  }.property('id'),
  
  hasStarted: function() {
    return moment(this.get('begin')).isBefore(moment());
  }.property('begin'),
  
  hasEnded: function() {
    return moment(this.get('end')).isBefore(moment());
  }.property('end'),
  
  isCurrent: function() {
    return this.get('hasStarted') && !this.get('hasEnded');
  }.property('hasStarted', 'hasEnded'),

  bugs: function() {
    return this.store.find('bug', {keywords:this.get('name')});
  }.property('name'),
  
  storyPointsDone: function() {
    var bugs = this.get('bugs');
    if (!bugs) {
      return;
    }
    var total = 0;
    bugs.forEach(function(bug) {
      if (bug.get('isDone')) {
        total += bug.get('storyPointsTotal');
      }
    });
    return total;
  }.property('bugs.@each.storyPointsTotal'),
  
  storyPointsDonePercent: function() {
    var done = this.get('storyPointsDone');
    var total = this.get('storyPointsTotal');
    if (total > 0) {
      return Math.round(100 * done / total);
    }
  }.property('storyPointsDone', 'storyPointsTotal'),
  
  storyPointsTotal: function() {
    var bugs = this.get('bugs');
    if (bugs) {
      var total = 0;
      bugs.forEach(function(bug) {
        total += bug.get('storyPointsTotal');
      });
      return total;
    }
  }.property('bugs.@each.storyPointsTotal')
  
});
