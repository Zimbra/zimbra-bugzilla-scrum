import Ember from 'ember';

export default Ember.Controller.extend({
  burndownChartData: null,
  high: 100,
  
  burndownChartOptions: Ember.computed('high', function() {
    return {
      low: 0,
      high: this.get('high'),
      lineSmooth: false
    };
  }),
  
  doneBugs: function() {
    var bugs = this.get('model.bugs');
    if (bugs) {
      return bugs.filterBy('isDone', true);
    }
  }.property('model.bugs.length'),
  
  setBurndownChartData: function() {
    var self = this;
    var data = {
      labels: [],
      series: [[]]
    };
    
    var sprint = this.get('model');
    if (!sprint) {
      return;
    }
    Ember.get(sprint, 'storyPointsTotal'); // start loading it, will reference it later (TODO: this is cheezy)
    
    var bugs = this.get('doneBugs');
    
    var params = {ids:[]};
    bugs.forEach(function(bug) {
      params.ids.push(bug.get('id'));
    });
    var url = 'https://bugzilla.zimbra.com/jsonrpc.cgi?method=Bug.history&params=[' + JSON.stringify(params) + ']';
    console.log('GET', url);
    Ember.$.ajax({
      url: url,
      dataType: 'jsonp',
      context: self,
      error: function(xhr, ajaxOptions, thrownError) {
        console.log('** err', thrownError);
      },
      success: function(response) {
        //console.log('** $.ajax returns', JSON.stringify(response));
        if (response.error) {
          console.log('** err', response.error);
        } else {
          var sprintBegin = moment(sprint.get('begin'));
          var sprintEnd = moment(sprint.get('end'));
          for (var day = sprintBegin.clone(); !day.isAfter(sprintEnd); day = day.add(1, 'days')) {
            var endOfDay = day.clone().add(1, 'days');
            data.labels.push(day.format('MMM D'));
            
            var storyPointsByBugId = {};
            _(response.result.bugs).forEachRight(function(historyByBug) {
              var bugId = historyByBug.id;
              
              _(historyByBug.history).forEachRight(function(history) {
                if (!moment(history.when).isBetween(sprintBegin, endOfDay)) {
                  return;
                }
                var change = _.find(history.changes, function(change) {
                  return change.field_name === 'status' && change.added === 'RESOLVED';
                });
                if (!change) {
                  return;
                }
                
                var bug = bugs.find(function(bug) {
                  return Ember.get(bug, 'id') == bugId;
                });
                storyPointsByBugId[bugId] = Ember.get(bug, 'storyPointsTotal');
              });
              
            });
            
            console.log('Story points by bug, completed by', day.format('MMM D'), JSON.stringify(storyPointsByBugId));
            var storyPoints = _.mapValues(storyPointsByBugId, function(n) {
              return n;
            });
            var storyPointsCompletedByDay = _.reduce(storyPoints, function(total, n) {
              return total + n;
            });
            if (typeof storyPointsCompletedByDay === 'undefined') {
              storyPointsCompletedByDay = 0;
            }
            var storyPointsTotal = sprint.get('storyPointsTotal');
            var storyPointsRemaining = storyPointsTotal - storyPointsCompletedByDay;
            self.set('high', storyPointsTotal);
            //console.log('** story points total=', storyPointsTotal, 'completed=', storyPointsCompletedByDay); 
            data.series[0].push(storyPointsRemaining);
          }
          
          //console.log('** burndownChartData=', JSON.stringify(data)); 
          self.set('burndownChartData', data);
        }
      }
    });
    
  }.observes('doneBugs.@each.resolvedOn', 'model.begin').on('init')
  
});
