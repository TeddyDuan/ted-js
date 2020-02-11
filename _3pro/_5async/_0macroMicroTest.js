async function async1() {
  /**
   * 异步函数中，非await代码仍然是同步代码。
   */
  console.log('a1 start');
  // ****************第3个微任务****************
  await async2();
  console.log('a1 end');
}

async function async2() {
  console.log('a2 start');
  /**
   * await执行完毕后，返回微任务，
   * 在微任务及后续代码执行前, 会先执行其EC中的同步代码，然后再回到async内部，继续后续执行。
   */

  // ****************第1个微任务****************
  await async3();

  console.log('a2 end');
}

async function async3() {
  console.log('a3');
}

console.log('g1');

setTimeout(() => console.log('t1'));
async1();
setTimeout(() => console.log('t2'));

new Promise((resolve) => {
  console.log('p1');
  resolve();
}).then(() => {
  // ****************第2个微任务****************
  console.log('p2');
});

console.log('g2');
/**
同步: g1
同步: a1 start
同步: a2 start
同步: a3
同步: p1
同步: g2
微任务1: a2 end
微任务2: p2
微任务3: a1 end
宏任务1: t1
宏任务2: t2
 */
