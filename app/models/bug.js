import DS from 'ember-data';

export default DS.Model.extend({
  assigned_to: DS.attr('string'),
  cc: DS.attr('string-array'),
  component: DS.attr('string'),
  creation_time: DS.attr('date'),
  creator: DS.attr('string'),
  keywords: DS.attr('string-array'),
  last_change_time: DS.attr('date'),
  priority: DS.attr('string'),
  product: DS.attr('string'),
  qa_contact: DS.attr('string'),
  resolution: DS.attr('string'),
  status: DS.attr('string'),
  summary: DS.attr('string'),
  
  comments: DS.hasMany('comment', {async:true}),
  
  externalUrl: function() {
    var id = this.get('id');
    if (id) {
      return 'http://bugzilla.zimbra.com/show_bug.cgi?id=' + id;
    }
  }.property('id'),
  
  isDone: function() {
    var status = this.get('status');
    return _.contains(['CLOSED', 'RESOLVED', 'VERIFIED'], status);
  }.property('status'),
  
  isInProgress: function() {
    var status = this.get('status');
    return status === 'IN_PROGRESS';
  }.property('status'),
  
  isToDo: function() {
    var status = this.get('status');
    return _.contains(['ASSIGNED', 'NEW'], status);
  }.property('status')
  
});
