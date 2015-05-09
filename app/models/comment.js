import DS from 'ember-data';

export default DS.Model.extend({
  attachment_id: DS.attr('number'),
  bug_id: DS.attr('number'),
  count: DS.attr('number'),
  creation_time: DS.attr('date'),
  creator: DS.attr('string'),
  is_private: DS.attr('boolean'),
  text: DS.attr('string'),
  time: DS.attr('date')
  
});
