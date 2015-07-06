import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('products');
  this.route('keywords');
  this.route('sprint', {path:'/sprint/:sprint_id'}, function() {
    this.route('work', function() {
      this.route('bug'    , {path:'/bug/:bug_id'});
      this.route('resolve', {path:'/resolve/:bug_id'});
    });
    this.route('plan');
    this.route('report');
  });
  this.route('bug', {path:'/bug/:bug_id'}, function() {
    this.route('history');
  });
  this.route('login');
});

export default Router;
