import Ember from 'ember';

export default Ember.Route.extend({
  
  model: function() {
    var self = this;
    return self.store.find('sprint', {isCurrent:true}).then(function(array) {
      return array.get('firstObject');
    });
  },
  
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('epicsInProgress', this.store.find('bug', {summary:'(Epic)', status:'IN_PROGRESS'}));
  }
  
});
