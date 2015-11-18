var assert = require('should');
var jmaths = require('../.');
var util = require('util');
var printValue;
function print(value) {
  if (typeof printValue !== 'undefined') {
    throw new Error('Test case does not match.');
  }
  printValue = value;
}
describe("./src/jmaths.js", function () {
  printValue = undefined;
  it("pointToPoint():base", function () {
    print(jmaths.pointToPoint([0, 0], [3, 4]));
    assert.equal(printValue, "5"); printValue = undefined;
  });
  it("pointToAngle():base", function () {
    print(jmaths.pointToAngle([0, 0], [3, 4]));
    assert.equal(printValue, "0.9272952180016122"); printValue = undefined;
  });
  it("rotatePoint():base", function () {
    print(JSON.stringify(jmaths.rotatePoint([0, 0], [3, 4], Math.PI)));
    assert.equal(printValue, "[6,8]"); printValue = undefined;
  });
  it("bezier():base", function () {
    print(jmaths.bezier([0, 1], 0.3));
    assert.equal(printValue, "0.3"); printValue = undefined;
    print(jmaths.bezier([0, 1, 2], 0.3));
    assert.equal(printValue, "0.6"); printValue = undefined;
    print(jmaths.bezier([0, 1.5, 2], 0.3));
    assert.equal(printValue, "0.8099999999999999"); printValue = undefined;
  });
  it("bezier():multidimensional", function () {
    print(JSON.stringify(jmaths.bezier([[0, 0, 0], [1, 1, 2]], 0.3)));
    assert.equal(printValue, "[0.3,0.3,0.6]"); printValue = undefined;
  });
  it("bezier():complex", function () {
    print(JSON.stringify(jmaths.bezier([[0, 0, 0], [1, 1, 0], [2, 2, 1]], 0.3)));
    assert.equal(printValue, "[0.6,0.6,0.09]"); printValue = undefined;
  });
  it("cutBezier():base", function () {
    print(JSON.stringify(jmaths.cutBezier(
      [[0, 0, 0], [1, 1, 0], [2, 2, 1]], 0.3))
    );
    assert.equal(printValue, "[[[0,0,0],[0.3,0.3,0],[0.6,0.6,0.09]],[[0.6,0.6,0.09],[1.3,1.3,0.3],[2,2,1]]]"); printValue = undefined;
  });
  it("pointToLine():base", function () {
    print(JSON.stringify(jmaths.pointToLine([50, 0], [0, 0], [0, 30])));
    assert.equal(printValue, "50"); printValue = undefined;
    print(JSON.stringify(jmaths.pointToLine([50, 0], [0, 30], [100, 35])));
    assert.equal(printValue, "32.45945101352995"); printValue = undefined;
  });
  it("sign():base", function () {
    print(JSON.stringify(jmaths.sign(10)));
    assert.equal(printValue, "1"); printValue = undefined;
    print(JSON.stringify(jmaths.sign(-10)));
    assert.equal(printValue, "-1"); printValue = undefined;
    print(JSON.stringify(jmaths.sign(0)));
    assert.equal(printValue, "0"); printValue = undefined;
  });
  it("doubleLineIntersect():base", function () {
    print(JSON.stringify(jmaths.doubleLineIntersect([0, 0], [50, 50], [50, 0], [0, 50])));
    assert.equal(printValue, "[25,25]"); printValue = undefined;
    print(String(jmaths.doubleLineIntersect([50, 0], [0, 30], [100, 35], [9, 200])));
    assert.equal(printValue, "undefined"); printValue = undefined;
  });
  it("pointToPolyline():base", function () {
    print(JSON.stringify(jmaths.pointToPolyline([1, 1], [[0, 0], [10, 0], [10, 10], [0, 10]])));
    assert.equal(printValue, "1"); printValue = undefined;
    print(JSON.stringify(jmaths.pointToPolyline([-1, 1], [[0, 0], [10, 0], [10, 10], [0, 10]])));
    assert.equal(printValue, "1.4142135623730951"); printValue = undefined;
  });
  it("pointInPolygon():base", function () {
    print(JSON.stringify(jmaths.pointInPolygon([1, 1], [[0, 0], [10, 0], [10, 10], [0, 10]])));
    assert.equal(printValue, "true"); printValue = undefined;
    print(JSON.stringify(jmaths.pointInPolygon([-1, 1], [[0, 0], [10, 0], [10, 10], [0, 10]])));
    assert.equal(printValue, "false"); printValue = undefined;
  });
  it("regularPolygon():base", function () {
    print(JSON.stringify(jmaths.regularPolygon(3, 100, 100, 15, 0)));
    assert.equal(printValue, "[[115,100],[92.5,112.99038105676658],[92.5,87.00961894323342]]"); printValue = undefined;
  });
});
