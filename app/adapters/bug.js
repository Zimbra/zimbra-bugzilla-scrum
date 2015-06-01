import ApplicationAdapter from './application';
import DS from 'ember-data';
import Ember from 'ember';

var include_fields = [
  'assigned_to',
  'cc',
  'cf_storypoints_developer',
  'cf_storypoints_docs',
  'cf_storypoints_pm',
  'cf_storypoints_qa',
  'cf_storypoints_ux',
  'component',
  'creation_time',
  'creator',
  'id',
  'keywords',
  'last_change_time',
  'priority',
  'product',
  'qa_contact',
  'resolution',
  'status',
  'summary'
];

//
// find 
//
var find = function (store, type, id, snapshot) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var params = {id:id};
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.search&params=[' + JSON.stringify(params) + ']';
    console.log('GET', url);
    Ember.$.ajax({
      url: url,
      dataType: 'jsonp',
      context: store,
      error: function(xhr, ajaxOptions, thrownError) {
        reject(thrownError);
      },
      success: function(response) {
        //console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          reject(response.error);
        } else {
          var bug = response.result.bugs[0];
          bug.history = [bug.id];
          resolve({bug:bug});
        }
      }
    });
  });
};


//
// findAll 
//
var findAll = function (store, type) {
  return findQuery(store, type, {});
};


//
// findQuery
//
var findQuery = function (store, type, query) {
  console.log('** findQuery', JSON.stringify(query));
  return new Ember.RSVP.Promise(function(resolve, reject) {
  
    // 1st-pass query fetches ids & keywords only, to apply the sprint filter based on keywords
    loadBugIds(store, query).then(function(bugIds) {
      console.log('** bugIds ' + bugIds);
      console.log(bugIds);
      
      // 2nd-pass query fetches the rest of the fields
      loadBugDetails(store, bugIds).then(function(bugs) {
      
        // 3rd-pass query fetches comment ids
        loadCommentIds(store, bugIds).then(function(commentsByBug) {
          _.map(bugs, function(bug) {
            bug.comments = commentsByBug[bug.id].comments.getEach('id');
            bug.history = [bug.id];
          });
          
          resolve({bugs:bugs});
          
        }).catch(function(err) {
          reject(err);
        });
        
      }).catch(function(err) {
        reject(err);
      });
      
    }).catch(function(err) {
      reject(err);
    });
        
  });
};


//
// updateRecord
//
var updateRecord = function (store, type, snapshot) {
  console.log('** updateRecord', JSON.stringify(snapshot));
  console.log('** updateRecord snapshot.record._inFlightAttributes', JSON.stringify(snapshot.record['_inFlightAttributes']));
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var params = _.clone(snapshot.record['_inFlightAttributes']);
    params.ids =[snapshot.id];
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.update&params=[' + JSON.stringify(params) + ']';
    console.log('GET', url);
    var self = this;
    Ember.$.ajax({
      url: url,
      dataType: 'jsonp',
      context: store,
      error: function(xhr, ajaxOptions, thrownError) {
        reject(thrownError);
      },
      success: function(response) {
        console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          reject(response.error);
        } else {
          console.log('Bug.update returns ' + JSON.stringify(response.result.bugs));
          resolve();
        }
      }
    });
  });
};


var loadBugIds = function(store, query) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var params = _.clone(query);
    delete params.keyword;
    delete params.keywords;
    //params.limit = 100000;
    params.target_milestone = 'Kiss';
    params.include_fields = ['id','keywords'];
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.search&params=[' + JSON.stringify(params) + ']';
    console.log('GET', url);
    var self = this;
    Ember.$.ajax({
      url: url,
      dataType: 'jsonp',
      context: store,
      error: function(xhr, ajaxOptions, thrownError) {
        reject(thrownError);
      },
      success: function(response) {
        //console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          reject(response.error);
        } else {
          console.log('Bug.search returns ' + response.result.bugs.length + ' bugs');
          var filtered = _.filter(response.result.bugs, function(bug) {
            if (query.keywords) {
              return _.contains(bug.keywords, query.keywords);
            } else {
              return true;
            }
          });
          var ids = _.pluck(filtered,'id');
          console.log('Bug.search filtered by keywords returns ' + filtered.length + ' bugs');
          resolve(ids);
        }
      }
    });
  });
};


var loadCommentIds = function(store, ids) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var params = {ids:ids, include_fields:['id']};
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.comments&params=[' + JSON.stringify(params) + ']';
    console.log('GET', url);
    Ember.$.ajax({
      url: url,
      dataType: 'jsonp',
      context: store,
      error: function(xhr, ajaxOptions, thrownError) {
        reject(thrownError);
      },
      success: function(response) {
        console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.result.bugs);
        }
      }
    });
  });
};


var loadBugDetails = function(store, ids) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var params = {id:ids, include_fields: include_fields};
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.search&params=[' + JSON.stringify(params) + ']';
    console.log('GET', url);
    Ember.$.ajax({
      url: url,
      dataType: 'jsonp',
      context: store,
      error: function(xhr, ajaxOptions, thrownError) {
        reject(thrownError);
      },
      success: function(response) {
        //console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.result.bugs);
        }
      }
    });
  });
};


export default ApplicationAdapter.extend({
  find: find,
  findAll: findAll,
  findQuery: findQuery,
  updateRecord: updateRecord
});
