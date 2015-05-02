import DS from 'ember-data';

export default DS.Model.extend({
  begin: DS.attr('date'),
  end: DS.attr('date'),
  
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
  }.property(['hasStarted', 'hasEnded'])
  
});
