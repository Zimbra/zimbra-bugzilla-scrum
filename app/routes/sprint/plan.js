import Ember from 'ember';

export default Ember.Route.extend({
  
  setupController: function(controller, model) {
    this._super(controller, model);
    
    var backlogKeywords = ['8_7_backlog'];
    controller.set('backlogKeywords', backlogKeywords);
    controller.set('backlog', this.store.find('bug', {keywords:backlogKeywords}));
  }
  
});
