setTimeout(() => console.log('t1'));
setTimeout(() => console.log('t2'));

new Promise((resolve) => {
  console.log('p1');
  resolve();
})
  .then(() => console.log(1))
  .then(() => console.log(2))
  .then(() => console.log(3));

new Promise((resolve) => {
  console.log('p2');
  resolve();
})
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6));
/**
同步: p1
同步: p2
微任务1: 1
微任务2: 4
微任务3: 2
微任务4: 5
微任务5: 3
微任务6: 6
宏任务1: t1
宏任务2: t2
 */
