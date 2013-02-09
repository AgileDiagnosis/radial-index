radial-index
============

## tl;dr

Compute radial order indices from unordered Cartesian coordinates relative to the origin or a specified point.

## Install

    npm install radial-index

## Basic usage

    $ var ri = require('radial-index')
    $ var points = [
        [-10, -26],
        [-11, 18],
        [11, 27]
      ];
    $ console.log(ri.getIndicesFromPoints(points));
    [1, 2, 0]

Note that the response array provides the indices in the same sequence as the original points argument.


## Options

`getIndicesFromPoints` optionally takes a configuration object as its second argument. That configuration object can provide provides three additional parameters to `getIndicesFromPoints`.


    {
        center:    Array. Format: [x, y]. Set the coordinate around which the radial indexing will occur.
        ccw:       Boolean. (Any truthy value.) Compute indices with a counter-clockwise rotation.
        rotate:    Number. From -360 to 360. The degree offset from the positive y-axis to begin the indexing rotation.
    }


`center` defaults origin [0, 0]. By default `getIndicesFromPoints` indexes points in a [clockwise fashion](http://en.wikipedia.org/wiki/Clockwise) starting from the positive y-axis: start at the 12 o'clock position moving to the right. Any truthy value set to `ccw` reverses this indexing movement. `rotate` controls the angle from which the indexing movement should begin--by default, the positive y-axis. Setting `rotate` to 90, for example, would start the indexing at the positive x-axis instead.


## Examples

             [y]
           (0, 100)
              |
              |  A
              |
    ----------+---------- (100, 0) [x]
     C        |
              |     B
              |

For the following examples, assume that `A` = [A.x, A.y], `B` = [B.x, B.y], etc. By default, `getIndicesFromPoints([A, B, C])` would return `[0, 1, 2]` because the indexer would start from [y] and sweep clockwise hitting A, then B, then C. That is:

    $ ri.getIndicesFromPoints([A, B, C])
    [0, 1, 2]

Other examples:

    $ ri.getIndicesFromPoints([A, B, C], {ccw: true})
    [2, 1, 0]

    $ ri.getIndicesFromPoints([A, B, C], {rotate: 90})
    [2, 0, 1]

    $ ri.getIndicesFromPoints([A, B, C], {ccw: true, rotate: 270})
    [2, 1, 0]

    $ ri.getIndicesFromPoints([A, B, C], {center: [-500, -500]})
    [1, 2, 0]


## Tests

    npm test


## Cautions

Calculating the radial component of a polar coordinate relies on trignometric functions that often produce extended floating point numbers. The accuracy of the indexing is therefore subject to JavaScript's floating point precision limitations. For general information about floating point issues, see [the floating point guide](https://github.com/brazzy/floating-point-gui.de).


## Contributors

- [kurttheviking](https://github.com/kurttheviking)


## License

&copy; 2013 Agile Diagnosis, Inc

[MIT](https://github.com/AgileDiagnosis/radial-index/LICENSE.md)
