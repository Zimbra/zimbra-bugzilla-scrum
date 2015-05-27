import Ember from 'ember';

export default Ember.Controller.extend({
  resolution: null,
  docsRequired: null,
  
  actions: {
    cancel: function() {
      this.transitionToRoute('sprint.work');
    },
    save: function() {
      console.log('** save');
      console.log('** resolution', this.get('resolution'));
      console.log('** docsRequired', this.get('docsRequired'));
      var bug = this.get('model');
      bug.set('status', 'RESOLVED');
      bug.set('resolution', this.get('resolution'));
      var docsRequired = this.get('docsRequired');
      if (docsRequired === 'NO_DOCS') {
        bug.setKeyword('NO_DOCS');
        bug.unsetKeyword('DOC_REQ');
      } else {
        bug.unsetKeyword('NO_DOCS');
        bug.setKeyword('DOC_REQ');
      }
      bug.save();
    }
  }
});
