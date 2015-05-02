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
  }.property(['hasStarted', 'hasEnded']),

  bugs: function() {
    return this.store.find('bug', {keywords:this.get('name')});
  }.property('name')
  
});
