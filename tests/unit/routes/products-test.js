import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:products', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
