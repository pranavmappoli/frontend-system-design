/**
 *  incremented value of the object property every time it was accessed.
 */

let obj = { i: 0 };

const proxy = new Proxy(obj, {
  get(target, property) {
    if (target[property] !== undefined) {
      target[property] += 1;
      return target[property];
    }
  },
});

console.log(proxy.i); // 1
console.log(proxy.i); // 2
console.log(proxy.i); // 3
