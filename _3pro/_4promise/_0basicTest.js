const Promise = require('./TedPromise');

function doSomething() {
  return Promise.resolve(1);
}

function doSomethingElse() {
  return Promise.resolve(2);
}

doSomething()
  .then(function() {
    return doSomethingElse();
  })
  .then((val) => console.log(1, val));

doSomething()
  .then(function() {
    doSomethingElse();
  })
  .then((val) => console.log(2, val));

doSomething()
  .then(doSomethingElse())
  .then((val) => console.log(3, val));

doSomething()
  .then(doSomethingElse)
  .then((val) => console.log(4, val));

Promise.resolve(1)
  .then(2)
  .then((val) => console.log('hahahaha', val));

Promise.all([1, 2, 3]).then(
  (results) => console.log('all', ...results),
  (err) => console.log(err),
);

Promise.race([1, 2, 3]).then(
  (rt) => console.log('race', rt),
  (err) => console.log('race', err),
);
