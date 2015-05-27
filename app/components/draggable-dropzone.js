import Ember from 'ember';

var { set } = Ember;

// from https://medium.com/delightful-ui-for-ember-apps/ember-js-and-html5-drag-and-drop-fa5dfe478a9a
export default Ember.Component.extend({
  classNames        : ['draggableDropzone'],
  classNameBindings : ['dragClass'],
  dragClass         : 'deactivated',
 
  dragLeave(event) {
    event.preventDefault();
    set(this, 'dragClass', 'deactivated');
  },
 
  dragOver(event) {
    event.preventDefault();
    set(this, 'dragClass', 'activated');
  },
 
  drop(event) {
    var data = event.dataTransfer.getData('text/data');
    this.sendAction('dropped', data);
    
    set(this, 'dragClass', 'deactivated');    
  }
});
