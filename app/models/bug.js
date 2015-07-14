import DS from 'ember-data';

export default DS.Model.extend({
  assigned_to: DS.attr('string'),
  cc: DS.attr('string-array'),
  cf_storypoints_developer: DS.attr('number'),
  cf_storypoints_docs: DS.attr('number'),
  cf_storypoints_pm: DS.attr('number'),
  cf_storypoints_qa: DS.attr('number'),
  cf_storypoints_ux: DS.attr('number'),
  component: DS.attr('string'),
  creation_time: DS.attr('date'),
  creator: DS.attr('string'),
  keywords: DS.attr('string-array'),
  last_change_time: DS.attr('date'),
  priority: DS.attr('string'),
  product: DS.attr('string'),
  qa_contact: DS.attr('string'),
  resolution: DS.attr('string'),
  status: DS.attr('string'),
  summary: DS.attr('string'),
  
  comments: DS.hasMany('comment', {async:true}),
  history: DS.hasMany('history', {async:true}),
  blocks: DS.hasMany('bug', {async:true, inverse:null}),
  
  docsRequired: function() {
    var keywords = this.get('keywords');
    if (keywords.contains('NO_DOCS')) {
      return 'NO_DOCS';
    } else if (keywords.contains('DOC_REQ')) {
      return 'DOC_REQ';
    }
  }.property('keywords.@each'),
  
  externalUrl: function() {
    var id = this.get('id');
    if (id) {
      return 'http://bugzilla.zimbra.com/show_bug.cgi?id=' + id;
    }
  }.property('id'),
  
  isDone: function() {
    var status = this.get('status');
    return _.contains(['CLOSED', 'RESOLVED', 'VERIFIED'], status);
  }.property('status'),
  
  isInProgress: function() {
    var status = this.get('status');
    return status === 'IN_PROGRESS';
  }.property('status'),
  
  isToDo: function() {
    var status = this.get('status');
    return _.contains(['ASSIGNED', 'NEW'], status);
  }.property('status'),
  
  isEpic: function() {
    var keywords = this.get('keywords');
    return keywords.contains('Epic');
  }.property('keywords.@each'),
  
  storyPointsTotal: function() {
    var total = 0;
    var self = this;
    _(['cf_storypoints_developer','cf_storypoints_docs','cf_storypoints_pm','cf_storypoints_qa','cf_storypoints_ux']).forEachRight(function(field) {
      var value = self.get(field);
      if (value) {
        total += Number(value);
      }
    });
    return total;
  }.property('cf_storypoints_developer','cf_storypoints_docs','cf_storypoints_pm','cf_storypoints_qa','cf_storypoints_ux'),
  
  blockedStoryPointsDone: function() {
    var bugs = this.get('blocks');
    if (!bugs) {
      return;
    }
    var total = 0;
    bugs.forEach(function(bug) {
      if (bug.get('isDone')) {
        total += bug.get('storyPointsTotal');
      }
    });
    return total;
  }.property('blocks.@each.storyPointsTotal', 'blocks.@each.isDone'),
  
  blockedStoryPointsDonePercent: function() {
    var done = this.get('blockedStoryPointsDone');
    var total = this.get('blockedStoryPointsTotal');
    if (total > 0) {
      return Math.round(100 * done / total);
    }
  }.property('blockedStoryPointsDone', 'blockedStoryPointsTotal'),
  
  blockedStoryPointsTotal: function() {
    var bugs = this.get('blocks');
    if (bugs) {
      var total = 0;
      bugs.forEach(function(bug) {
        total += bug.get('storyPointsTotal');
      })
      return total;
    }
  }.property('blocks.@each.storyPointsTotal'),
  
  setKeyword: function(name) {
    var keywords = this.get('keywords');
    if (keywords.indexOf(name) == -1) {
      keywords.push(name);
    } 
  },
  
  unsetKeyword: function(name) {
    var keywords = this.get('keywords');
    var at = keywords.indexOf(name);
    if (at > -1) {
      keywords.splice(at, 1);
    } 
  }
  
});
