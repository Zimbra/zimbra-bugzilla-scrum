import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('history', {
  // Specify the other units that are required for this test.
  needs: ['model:bug', 'model:comment']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
