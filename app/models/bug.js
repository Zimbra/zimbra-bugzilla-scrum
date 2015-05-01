import DS from 'ember-data';

export default DS.Model.extend({
  assigned_to: DS.attr('string'),
  component: DS.attr('string'),
  keywords: DS.attr('string-array'),
  priority: DS.attr('string'),
  product: DS.attr('string'),
  resolution: DS.attr('string'),
  status: DS.attr('string'),
  summary: DS.attr('string')
});
