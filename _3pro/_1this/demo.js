const a = 'a in window';

function test(tip = 'after timeout') {
  console.log(tip, this.a);
  console.log(a);
}

test('test() = '); // test.call(undefined, ...args);

const obj = {
  a: 'a in obj',
  test,
};

obj.test('obj.test() = '); // obj.test.call(obj, ...args);

const obj2 = {
  a: 'a in obj2',
  obj,
};

obj2.obj.test('obj2.obj.test() = '); // obj2.obj.test.call(obj2.obj, ...args);

const objTest = obj.test;
objTest('objTest() = '); // objTest.call(undefined, ...args);

const arr = [];
arr.a = 'a in arr';
arr[0] = test;
arr[0]('arr[0]() = '); // arr.0.call(arr, ...args);

setTimeout(obj.test, 2000); // callbackFn.call(undefined, ...args);
/**
 * setTimeout = function(callbackFn, timestamp){
 *     //wait after timestamp milliseconds
 *     callbackFn();
 * }
 */
