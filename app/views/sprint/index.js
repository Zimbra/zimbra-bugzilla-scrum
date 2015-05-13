import Ember from 'ember';

export default Ember.View.extend({

  progressBarStyle: function() {
    return 'width:' + this.get('controller.model.storyPointsDonePercent') + '%';
  }.property('controller.model.storyPointsDonePercent')
  
});
