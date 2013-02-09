var assert = require('assert');
var ri = require('./index');

var a = [25, 75];
var b = [50, -60];
var c = [-90, -10];

var points = [a, b, c];
var result = [];
var options = {};

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

console.log('all tests pass');
