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
});
