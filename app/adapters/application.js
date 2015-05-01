import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'https://bugzilla.zimbra.com'
});
