import Ember from 'ember';

export default Ember.Controller.extend({

  bugs: function() {
    return this.store.find('bug', {keywords:this.get('model.name')});
  }.property('model.name')

});
