var assert = require('should');
var jmaths = require('..');

jmaths.bezier();
jmaths.bezier([[1]], 0);
jmaths.cutBezier();
jmaths.pointToPolyline();
jmaths.regularPolygon(3, 100, 100, 15, 0);

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

  it('bezier([[0], [10]], 0.5)', function() {
    var t = jmaths.bezier([[0], [10]], 0.5);
    assert.ok(t instanceof Array && t.length === 1 && t[0] - 5 <= 1e-10);
  });

  it('cutBezier([0, 2, 10], 0.5)', function() {
    var a = jmaths.cutBezier([0, 2, 10], 0.5);
    assert.ok(
      Math.abs(a[0][0] - 0) <= 1e-10 &&
      Math.abs(a[0][1] - 1) <= 1e-10 &&
      Math.abs(a[0][2] - 3.5) <= 1e-10 &&
      Math.abs(a[1][0] - 3.5) <= 1e-10 &&
      Math.abs(a[1][1] - 6) <= 1e-10 &&
      Math.abs(a[1][2] - 10) <= 1e-10
    );
  });

  it('sign(0.1)', function() {
    assert.ok(jmaths.sign(0.1) === 1);
  });
  it('sign(-0.1)', function() {
    assert.ok(jmaths.sign(-0.1) === -1);
  });
  it('sign(0)', function() {
    assert.ok(jmaths.sign(0) === 0);
  });

  it('pointToLine([0, 0], [1, 2], [1, 6])', function() {
    assert.ok(jmaths.pointToLine([0, 0], [1, 2], [1, 6]) - 2.23606797749979 <= 1e-10);
  });
  it('pointToLine([0, 0], [1, 2], [1, 2])', function() {
    assert.ok(jmaths.pointToLine([0, 0], [1, 2], [1, 2]) - 2.23606797749979 <= 1e-10);
  });

  it('doubleLineIntersect([0, 0], [1, 2], [0, 6], [1, 2])', function() {
    var t = jmaths.doubleLineIntersect([0, 0], [1, 2], [0, 6], [1, 0]);
    assert.ok(t[0] === 0.75 && t[1] === 1.5);
  });

  it('pointToPolyline([0, 0], [[1, 2], [0, 6], [1, 2]])', function() {
    var t = jmaths.pointToPolyline([0, 0], [[1, 2], [0, 6], [1, 2]]);
    assert.ok(t - 2.23606797749979 <= 1e-10);
  });

  it('pointInPolygon([0, 0], [[1, 2], [0, 6], [1, 2]])', function() {
    var t = jmaths.pointInPolygon([0, 0], [[1, 2], [0, 6], [1, 2]]);
    assert.ok(!t);
  });

});