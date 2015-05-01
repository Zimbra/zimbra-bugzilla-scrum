import DS from 'ember-data';

export default DS.Transform.extend({
  
  deserialize: function(serialized) {
    if (_.isArray(serialized)) {
      return serialized;
    } else if (_.isString(serialized)) {
      return serialized.split(',');
    } else {
      return [];
    }
  },

  serialize: function(deserialized) {
    if (_.isArray(deserialized)) {
      return deserialized;
    } else if (_.isString(deserialized)) {
      return deserialized.split(',');
    } else {
      return [];
    }
  }
  
});
