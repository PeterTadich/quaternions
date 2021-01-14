//mcqt = matrix computations quaternions

//ECMAScript module

import * as hlao from 'matrix-computations';
//import * as hlao from '../matrix-computations/hlao.mjs';

//ref:
//   - I:\onlineCourses\robotics_course\video\robot\L3\3 12 Quaternions\3.12 Quaternions (720p).mp4
//   - Robotics, page 54.
//   - I:\code\spatial_v2\js\3D\rq.js
//   - B.3 Quaternion to matrix (p91) Quaternions, Interpolation and Animation
/*
rotationMatrixFromUnitQuaternion(q1); //q1 see below
*/
function rotationMatrixFromUnitQuaternion(q){
    var n  = q[0][0];
    var ex = q[1][0];
    var ey = q[2][0];
    var ez = q[3][0];
    
    var r11 = 2.0*(n*n + ex*ex) - 1.0;
    var r12 = 2.0*(ex*ey - n*ez);
    var r13 = 2.0*(ex*ez + n*ey);
    var r21 = 2.0*(ex*ey + n*ez);
    var r22 = 2.0*(n*n + ey*ey) - 1.0;
    var r23 = 2.0*(ey*ez - n*ex);
    var r31 = 2.0*(ex*ez - n*ey);
    var r32 = 2.0*(ey*ez + n*ex);
    var r33 = 2.0*(n*n + ez*ez) - 1.0;
    var R = [
        [r11, r12, r13],
        [r21, r22, r23],
        [r31, r32, r33]
    ];
    return R;
}

/*
//ref: B.4 Matrix to Quaternion (p93) Quaternions, Interpolation and Animation
var R0 = [
    [ 1.0,    0.0,    0.0],
    [ 0.0,    1.0,    0.0],
    [ 0.0,    0.0,    1.0]
];
var q0 = unitQuaternionFromRotationMatrix(R0);
printQuaternion(q0);
//result: 1 < 0, 0, 0 >
var R1 = [
    [ 0.9021,   -0.3836,    0.1977],
    [ 0.3875,    0.9216,    0.0198],
    [-0.1898,    0.0587,    0.9801]
];
var q1 = unitQuaternionFromRotationMatrix(R1);
printQuaternion(q1);
//result: 0.97517 < 0.0099667, 0.099335, 0.19768 >
*/
function unitQuaternionFromRotationMatrix(R){
    var n = 0.5*Math.sqrt(R[0][0] + R[1][1] + R[2][2] + 1.0);
    var sgnr23r23 = (((R[2][1] - R[1][2]) >= 0.0) ? 1.0 : -1.0); //conditional (ternary) operator
    var sgnr13r31 = (((R[0][2] - R[2][0]) >= 0.0) ? 1.0 : -1.0);
    var sgnr21r12 = (((R[1][0] - R[0][1]) >= 0.0) ? 1.0 : -1.0);
    var ex = 0.5*sgnr23r23*Math.sqrt(R[0][0] - R[1][1] - R[2][2] + 1.0);
    var ey = 0.5*sgnr13r31*Math.sqrt(R[1][1] - R[2][2] - R[0][0] + 1.0);
    var ez = 0.5*sgnr21r12*Math.sqrt(R[2][2] - R[0][0] - R[1][1] + 1.0);
    return([[n],[ex],[ey],[ez]]);
}

//spherical linear interpolation (slerp) see interp.m
//C:\Program Files\MATLAB\robot\rvctools\robot\Octave\@Quaternion
//https://en.wikipedia.org/wiki/Slerp
//https://au.mathworks.com/help/fusion/ref/quaternion.slerp.html
/*
printQuaternion(quaternionSlerp(q0,q1,0.5));
//result: 0.99377 < 0.0050146, 0.049979, 0.099458 >
*/
function quaternionSlerp(q1,q2,t){
    //clip values of t
    if(t<0) t = 0.0;
    if(t>1) t = 1.0;
    
    //dot product
    var theta = Math.acos(hlao.vector_dot(q1,hlao.vector_transpose(q2)));
    
    if(theta === 0.0){
        var q = q1;
    } else {
        //q = Quaternion( (sin((1-r)*theta) * q1 + sin(r*theta) * q2) / sin(theta) );
        var q = 
            hlao.matrix_multiplication_scalar(
                hlao.matrix_arithmetic(
                    hlao.vector_multiplication_scalar(q1,Math.sin((1.0 - t) * theta)),
                    hlao.vector_multiplication_scalar(q2,Math.sin(t * theta)),
                    '+'
                ),
                1.0/Math.sin(theta)
            );
    }
    
    return q;
}

function printQuaternion(q){
    console.log(q[0][0].toFixed(6) + " < " + q[1][0].toFixed(6) + ", " + q[2][0].toFixed(6) + ", " + q[3][0].toFixed(6) + " >");
}

export {
    rotationMatrixFromUnitQuaternion,
    unitQuaternionFromRotationMatrix,
    quaternionSlerp,
    printQuaternion
};
