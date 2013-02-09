var _ = require('lodash');

var TWOPI = 2 * Math.PI;


function getIndicesFromPoints(xyPairs, options){
  // ensure required argument xyPairs has a valid structure
  if(!_.isArray(xyPairs)){
    throw new TypeError('the first argument must be an array');
  }

  xyPairs.forEach(function(xyPair, i){
    if(!_.isArray(xyPair) || xyPair.length != 2){
      throw new TypeError('coordinate pair must be a two-element array of numbers (pair #' + i + ')');
    }
  });

  // quick deep copy (don't pollute original values)
  xyPairs = _.clone(xyPairs, true);

  // defaults
  var center = [0, 0]; // origin
  var clockwise = true; // clockwise rotation
  var rotation = -Math.PI/2; // positive y-axis

  if (options) {
    // if a center point was passed, ensure it has a valid structure
    if (options.center) {
      if (!_.isArray(options.center)){
        throw new TypeError('options.center must be an array');
      }

      if (options.center.length != 2){
        throw new TypeError('options.center must be a two-element array of numbers');
      }

      center = _.clone(options.center);
    }

    // if truthy ccw (counterclockwise) passed reverse clockwise
    if (options.ccw) {
      clockwise = !(options.ccw);
    }

    if (options.rotate) {
        if(!_.isNumber(options.rotate)) {
          throw new TypeError('options.rotation must be a number');
        }

        rotation = (options.rotate - 90)/180 * Math.PI;
    }
  }

  // get radian component of polar coordinate(s) and rotate by the designated amount
  var radialIndices = _rotateRadian(_polarRadian(center, xyPairs), rotation);
  var compositeIndices = [];
  var response = [];

  // track raw index and sorted radial index
  radialIndices.forEach(function(ri, i){
    compositeIndices.push({
      indexRaw: i,
      indexRadial: ri
    });
  });

  // sort the compositeIndices indices by indexRadial
  compositeIndices = _.sortBy(compositeIndices, function(r){
    return r.indexRadial;
  });

  // if computing clockwise roation, reverse the array
  if (clockwise) {
    compositeIndices.reverse();
  }

  // then loop over the sorted array to specify the sort indices
  // in the same order of the original arguments
  compositeIndices.forEach(function(c, i){
    response[c.indexRaw] = i;
  });

  return response;
}

/**
 * _polarRadian compute radian component of polar coordinate relative to a center point
 * @param  {Array} xyCenter         [x, y] center point to anchor radial sweep
 * @param  {Array} xyPointsArray    Array of [x, y] arrays -- one for each point to index
 * @return {Array}                  the radian position (between 0 and 2PI) of each coordinate
 */
function _polarRadian(xyCenter, xyPointsArray) {
  // simplify the math by moving the computed circle center to [0, 0]
  var xAdj = 0 - xyCenter[0],
      yAdj = 0 - xyCenter[1];

  return _.map(xyPointsArray, function(xy){
    // reposition x and y relative to adjusted [0, 0] center
    var x = xy[0] + xAdj;
    var y = xy[1] + yAdj;

    var adjArcTan = Math.atan2(y, x);

    // compensate for quad3 and quad4 results
    if(adjArcTan < 0){
      adjArcTan = 2 * Math.PI + adjArcTan;
    }

    return adjArcTan;
  });
}

/**
 * _rotateRadian rotates a list of radial positions by the desired radian amount
 * @param  {Array} radiansRaw  List of radial positions to rotate
 * @param  {Float} radialAdj   The radial rotation to apply -- max rotation is 2PI
 * @return {Array}             rotates a list of radial positions by the desired radian amount
 */
function _rotateRadian(radiansRaw, radialAdj) {
  radialAdj %= TWOPI;

  return _.map(radiansRaw, function(r){
    r += radialAdj;

    // for radial positions that cross the baseline, recompute
    if(r > TWOPI) { return r -= TWOPI; }
    if(r < 0) { return r += TWOPI; }

    return r;
  });
}

exports.getIndicesFromPoints = getIndicesFromPoints;
