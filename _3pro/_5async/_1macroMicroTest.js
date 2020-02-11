async function a1() {
  console.log(1);
  console.log(2);

  // ****************第1个微任务****************
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('p1');

      resolve(); // 只有当promise状态发生变化后，await后的代码才可能执行。
    }, 1000);
  });

  await console.log('pdone');

  console.log(3);
  console.log(4);
}

async function a2() {
  console.log(5);
  console.log(6);

  // ****************第2个微任务****************
  await Promise.resolve().then(() => console.log('p2'));
  console.log(7);
  console.log(8);
}

a1();
a2();
console.log('end');
/*
同步: 1
同步: 2
同步: 5
同步: 6
同步: end

微任务2: p2
p2后的宏任务: 7
p2后的宏任务: 8

微任务1: p1, 1s后才resolve
微任务3: pdone
pd后的宏任务: 3
pd后的宏任务: 4
*/
