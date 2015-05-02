import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['sprint'],
  sprint: null,
  
  filteredBugs: function() {
    var sprint = this.get('sprint');
    console.log('** sprint qparam', sprint);
    if (sprint) {
      var query = {};
      //query.keyword = ['S' + sprint];
      //query.keywords_type = 'allwords';
      return this.store.find('bug', query);
    } else {
      return this.store.find('bug');
    }
  }.property('sprint'),
  
  filteredBugs2: function() {
    var sprint = this.get('sprint');
    if (!sprint) {
      return this.get('filteredBugs');
    }
    var bugs = this.get('filteredBugs');
    if (bugs) {
      //query.keyword = ['S' + sprint];
      return bugs.filter(function(bug) {
        var keywords = bug.get('keywords');
        if (keywords) {
          return _.contains(keywords, 'S' + sprint);
        }
        return false; // doesn't match this sprint
      });
    }
  }.property('filteredBugs.length'),
  
  inProgressBugs: function() {
    var bugs = this.get('filteredBugs2');
    if (bugs) {
      return bugs.filterBy('status', 'IN_PROGRESS');
    }
  }.property('filteredBugs2.length'),
  
  doneBugs: function() {
    var bugs = this.get('filteredBugs2');
    if (!bugs) {return;}
    return bugs.filterBy('status', 'RESOLVED');
  }.property('filteredBugs2.length'),
  
  toDoBugs: function() {
    var bugs = this.get('filteredBugs2');
    if (!bugs) {return;}
    return bugs.filter(function(bug) {
      var status = bug.get('status');
      if (status === 'ASSIGNED') {
        return true;
      }
      return false;
    });
  }.property('filteredBugs2.length')
  
});
