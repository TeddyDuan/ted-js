const Promise = require('./TedPromise');

const p0 = new Promise((resolve) => {
  resolve(-1); // 当前宏任务中,p0状态更新为fulFilled
});

// 基础流程测试
/* p0.then(() => 2)
  .then(() => {
    return 3;
  })
  .then(() => {
    return 4;
  })
  .then((val) => {
    console.log(val);
  }); */

// nextOnFulfilleds nextOnRejecteds堆栈测试
const p1 = p0.then(() => 0); // p0为fulFilled

// 当前宏任务执行栈, p1状态为pending, ()=>0微任务尚未执行，状态未更新。
// then函数本身为同步逻辑，then中的onFulfilleds会压入p1的栈，在p1状态更新后，相应更新各后继promise.
p1.then(() => 3);
p1.then(() => 4);
p1.then((val) => console.log(val));
