setTimeout(() => console.log('global timeout: 3000ms'), 3000);
setTimeout(() => console.log('global timeout: 0ms'));

console.log('global: ec1');

Promise.resolve().then(() => console.log('global promise'));

(() => {
  setTimeout(() => console.log('func timeout: 3000ms'), 3000);
  setTimeout(() => console.log('func timeout: 0ms'));
  for (let i = 0; i < 2; ++i) {
    console.log(`func: ${i}`);
    process.nextTick(() => console.log(`func nextTick: ${i}`));
  }
  setImmediate(() => console.log('func: immediate'));
  Promise.resolve().then(() => console.log('func promise'));
})();

for (let i = 0; i < 2; ++i) {
  console.log(`global: ${i}`);
  process.nextTick(() => console.log(`global nextTick: ${i}`));
}

setImmediate(() => console.log('global: immediate'));

console.log('global: ec2');
/*
执行顺序如下:

// ECS
global: ec1
func: 0
func: 1
global: 0
global: 1
global: ec2

// micro: extTick
func nextTick: 0
func nextTick: 1
global nextTick: 0
global nextTick: 1

// micro: promise
global promise
func promise

// macro: timeout 0
global timeout: 0ms
func timeout: 0ms

// macro: immediate
func: immediate
global: immediate

// 事件循环在合适的时机将timeout-X压入ECS, 发起相应的宏任务
global timeout: 3000ms
func timeout: 3000ms
*/
