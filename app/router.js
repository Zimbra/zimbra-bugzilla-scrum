import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('bugs');
  this.route('products');
  this.route('keywords');
  this.route('sprints');
});
