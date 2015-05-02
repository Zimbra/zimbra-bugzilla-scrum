import ApplicationAdapter from './application';

//
// findAll 
//
var findAll = function (store, type) {
  var sprints = [];
  for (var i = 1; i <= 17; i++) {
    var sprint = {
      id: i,
      name: 'S' + i
    };
    sprints.push(sprint);
  }
  return {sprints:sprints};
};


export default ApplicationAdapter.extend({
  findAll: findAll
});
