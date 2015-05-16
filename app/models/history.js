import DS from 'ember-data';

export default DS.Model.extend({
  added: DS.attr('string'),
  field_name: DS.attr('string'),
  removed: DS.attr('string'),
  when: DS.attr('date'),
  who: DS.attr('string'),
  
  bug: DS.belongsTo('bug', {async:true})
});
