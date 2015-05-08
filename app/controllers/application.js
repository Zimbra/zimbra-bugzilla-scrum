import Ember from 'ember';

export default Ember.Controller.extend({
  currentPathDidChange: function() {
    var currentPath = this.get('currentPath');
    ZimbraBugzillaScrum.set('currentPath', currentPath);
  }.observes('currentPath')
});
