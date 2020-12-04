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
printQuaternion(q);
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
0.97517 < 0.009967, 0.099335, 0.197680 >
```