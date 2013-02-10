var assert = require('assert');
var ri = require('./index');

var a = [25, 75];
var b = [50, -60];
var c = [-90, -10];

var points = [a, b, c];
var result = [];
var options = {};
var testFn;

result = ri.getIndicesFromPoints(points);
assert.equal(result.toString(), [0, 1, 2].toString(), 'general case, no options given');

options.ccw = true;
result = ri.getIndicesFromPoints(points, options);
assert.equal(result.toString(), [2, 1, 0].toString(), 'counter-clockwise indexing');

options = {};
options.rotate = 90;
result = ri.getIndicesFromPoints(points, options);
assert.equal(result.toString(), [2, 0, 1].toString(), 'rotate indexing 90 degrees');

options = {};
options.ccw = true;
options.rotate = 270;
result = ri.getIndicesFromPoints(points, options);
assert.equal(result.toString(), [2, 1, 0].toString(), 'counter-clockwise indexing, rotated 270 degrees');

options = {};
options.center = [-500, -500];
result = ri.getIndicesFromPoints(points, options);
assert.equal(result.toString(), [1, 2, 0].toString(), 'index from [-500, -500]');

options = {};
options.ccw = true;
options.rotate = 270 + 360;
result = ri.getIndicesFromPoints(points, options);
assert.equal(result.toString(), [2, 1, 0].toString(), 'counter-clockwise indexing, over-rotated 270 (+360) degrees');

testFn = function() {
  ri.getIndicesFromPoints();
};
assert.throws(testFn, TypeError, 'throws type error when no points argument provided');

testFn = function() {
  ri.getIndicesFromPoints([[10, 10], 5]);
};
assert.throws(ri.getIndicesFromPoints, TypeError, 'throws type error when an argument element is not an array');

testFn = function() {
  ri.getIndicesFromPoints(points, {rotate: 'b'});
};
assert.throws(ri.getIndicesFromPoints, TypeError, 'throws type error when optional rotate param is not a number');

console.log('SUCCESS: tests passed');