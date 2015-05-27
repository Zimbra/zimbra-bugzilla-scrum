import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['sprintWorkResolve'],
  resolutions: ['FIXED','INVALID','WONTFIX','NEEDINFO','DUPLICATE','WORKSFORME','MOVED'],
  docRequirements: ['NO_DOCS','DOC_REQ']
});
