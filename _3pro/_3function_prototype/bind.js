Function.prototype.tBind = function(thisArg) {
  const self = this;
  const rest = Array.prototype.slice.call(arguments, 1); // eslint-disable-line
  return function() {
    const extra = Array.prototype.slice.call(arguments); // eslint-disable-line
    return self.apply(thisArg, rest.concat(extra));
  };
};
