import Ember from 'ember';

var { get } = Ember;

// from https://medium.com/delightful-ui-for-ember-apps/ember-js-and-html5-drag-and-drop-fa5dfe478a9a
export default Ember.Component.extend({
  classNames        : ['draggableItem'],
  attributeBindings : ['draggable'],
  draggable         : 'true',
  
  dragStart(event) {
    return event.dataTransfer.setData('text/data', get(this, 'content'));
  }
});
