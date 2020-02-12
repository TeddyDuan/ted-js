Function.prototype.tBind = function(context) {
  const self = this;

  const { slice } = Array.prototype;
  const bindRestArgs = slice.call(arguments, 1); // eslint-disable-line

  const f = (function() {
    function F() {}
    F.prototype = self.prototype;
    return new F();
  })();

  function BindFunc() {
    self.apply(
      this instanceof BindFunc ? this : context,
      bindRestArgs.concat(slice.call(arguments)), // eslint-disable-line
    );
  }
  BindFunc.prototype = f; // bind返回的函数寄生组合式继承原函数。

  return BindFunc;
};

function Point(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

Point.prototype.toString = function() {
  console.log('x', this.x, 'y', this.y, 'z', this.z);
};

const obj = {};
const BindPoint = Point.tBind(obj, 0);
const bp = new BindPoint(1, 2);
bp.toString(); // x 0 y 1 z 2

console.log(obj); // {}
BindPoint(3, 4);
console.log(obj); // { x: 0, y: 3, z: 4 }
