Function.prototype.simpleBind = function(context) {
  const self = this;
  const { slice } = Array.prototype;
  const bindRestArgs = slice.call(arguments, 1); // eslint-disable-line

  return function() {
    self.apply(context, bindRestArgs.concat(slice.call(arguments))); // eslint-disable-line
  };
};

function test() {
  console.log(this.val, ...arguments); // eslint-disable-line
}

const a = { val: 'aval' };

const tb = test.simpleBind(a, 1, 2, 3);
tb.call(a, 4, 5);
tb.apply(a, [4, 5, 6]);
tb(4, 5, 6, 7);
