import ApplicationAdapter from './application';
import Ember from 'ember';
import moment from 'moment';
import model from '../models/sprint';
import sprintData from '../sprintData';


//
// find 
//
var find = function (store, type, id, snapshot) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var sprint = _.find(sprintData, {id:Number(id)});
    resolve({sprint:sprint});
  });
};


//
// findAll 
//
var findAll = function (store, type) {
  return {sprints:sprintData};
};


//
// findQuery
//
var findQuery = function (store, type, query) {
  console.log('** findQuery', JSON.stringify(query), _.keys(query));
  var self = this;
  var sprints = _.filter(sprintData, function(sprint) {
    var sprint_ = _.cloneDeep(sprint);
    delete sprint_.id;
    var keys = _.keys(query);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var obj = self.store.createRecord('sprint', sprint_);
      if (!Ember.isEqual(query[key], Ember.get(obj, key))) {
        return false;
      }
      return true;
    } 
  });
  return {sprints:sprints};
};


export default ApplicationAdapter.extend({
  find: find,
  findAll: findAll,
  findQuery: findQuery
});
