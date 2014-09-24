var assert = require('should');
var jmaths = require('..');

describe('jmaths', function() {

  it('pointToPoint', function() {
    assert.ok(Math.abs(jmaths.pointToPoint([0, 1], [0, 2]) - 1) <= 1e-10);
    assert.ok(Math.abs(jmaths.pointToPoint([0, 3], [4, 0]) - 5) <= 1e-10);
  });

  it('pointToAngle', function() {
    assert.ok(Math.abs(jmaths.pointToAngle([0, 1], [0, 2]) - 0.5 * Math.PI) <= 1e-10);
    assert.ok(Math.abs(jmaths.pointToAngle([0, 3], [4, 0]) - -0.6435011087932844) <= 1e-10);
  });

  it('rotatePoint', function() {
    var p = jmaths.rotatePoint([1, 1], [0, 0], 0.5 * Math.PI);
    assert.ok(Math.abs(p[0] - -1) <= 1e-10 && Math.abs(p[1] - 1) <= 1e-10);
  });

  it('bezier([0, 10], 0.5)', function() {
    assert.ok(Math.abs(jmaths.bezier([0, 10], 0.5) - 5) <= 1e-10);
  });

  it('bezier([0, 2, 10], 0.5)', function() {
    assert.ok(Math.abs(jmaths.bezier([0, 2, 10], 0.5) - 3.5) <= 1e-10);
  });

});