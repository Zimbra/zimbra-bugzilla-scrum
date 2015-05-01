import ApplicationAdapter from './application';
import Ember from 'ember';

//
// findAll 
//
var findAll = function (store, type) {
  var self = this;
  var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    reject(new Error("NIY"));
  });
  return promise;
};


export default ApplicationAdapter.extend({
  findAll: findAll
});
