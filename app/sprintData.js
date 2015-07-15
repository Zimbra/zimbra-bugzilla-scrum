var sprintDefs = [
  {id:34, end:'2016-12-29'},
  {id:33, end:'2016-12-15'},
  {id:32, end:'2015-12-01'},
  {id:31, end:'2015-11-17'},
  {id:30, end:'2015-11-03'},
  {id:29, end:'2015-10-20'},
  {id:28, end:'2015-10-06'},
  {id:27, end:'2015-09-22'},
  {id:26, end:'2015-09-08'},
  {id:25, end:'2015-08-25'},
  {id:24, end:'2015-08-11'},
  {id:23, end:'2015-07-28'},
  {id:22, end:'2015-07-14'},
  {id:21, end:'2015-06-30'},
  {id:20, end:'2015-06-16'},
  {id:19, end:'2015-06-02'},
  {id:18, end:'2015-05-19'},
  {id:17, end:'2015-05-05'},
  {id:16, end:'2015-04-21'},
  {id:15, end:'2015-04-07'},
  {id:14, end:'2015-03-24'},
  {id:13, end:'2015-03-10'},
  {id:12, end:'2015-02-24'},
  {id:11, end:'2015-02-10'},
  {id:10, end:'2015-01-27'},
  {id: 9, end:'2015-01-13'},
  {id: 8, end:'2014-12-23'},
  {id: 7, end:'2014-12-09', begin:'2014-11-19'}
];


var fillInBeginDates = function () {
  var prevSprint;
  var sprintData = _(sprintDefs).forEachRight(function(sprint) {
    if (!sprint.begin && prevSprint) {
      sprint.begin = moment(prevSprint.end).add(1, 'days').format();
    }
    sprint.end = moment(sprint.end).format();
    prevSprint = sprint;
    return sprint;
  }).value();
  return sprintData;
};

export default fillInBeginDates();
