# quaternions
Quaternions - rotations

## Installation

### Node.js

```bash
npm install https://github.com/PeterTadich/quaternions
```

### Google Chrome Web browser

No installation required for the Google Chrome Web browser.

## How to use

### Node.js

```js
import * as mcqt from 'quaternions';
```

### Google Chrome Web browser

```js
import * as mcqt from './mcqt.mjs';
```

## Examples

### Node.js (server side)

Copy the following code to index.mjs

```js
import * as mcqt from 'quaternions';

var R = [
    [ 0.9021,   -0.3836,    0.1977],
    [ 0.3875,    0.9216,    0.0198],
    [-0.1898,    0.0587,    0.9801]
];
var q = mcqt.unitQuaternionFromRotationMatrix(R);
mcqt.printQuaternion(q);
```

Then run:

```bash
npm init -y
npm install https://github.com/PeterTadich/quaternions
node index.mjs
```

If the above does not work, modify the package.json file as follows:
Helpful ref: [https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js)

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node --experimental-modules index.mjs"
  },
"type": "module",
```

Now try:

```bash
npm start
```

Returns:

```js
0.975167 < 0.010000, 0.099247, 0.197737 >
```

## Examples (extended)

Spherical linear quaternion interpolation: Slerp - quaternionSlerp().

```js
import * as hlao from 'matrix-computations';
import * as mcqt from 'quaternions';
import * as mcer from 'elementary-rotations';

//create rotation matrices
var R0 = mcer.Rx_elementary(Math.PI);
var R1 = hlao.matrix_multiplication(
            mcer.Ry_elementary(Math.PI/2.0),
            mcer.Rz_elementary(-1.0*Math.PI/2.0)
        );

//convert to quaternions
var q0 = mcqt.unitQuaternionFromRotationMatrix(R0);
var q1 = mcqt.unitQuaternionFromRotationMatrix(R1);

//interpolate at 0.5
var t = 0.5; //t from [0,1]
var q = mcqt.quaternionSlerp(q0,q1,t);

//convert to rotation matrix and print to console
var R = mcqt.rotationMatrixFromUnitQuaternion(q);
console.log(R);
```

Returns:

```js
[
  [ 0.0,  1.0,  0.0],
  [ 0.0,  0.0, -1.0],
  [-1.0,  0.0,  0.0]
]
```