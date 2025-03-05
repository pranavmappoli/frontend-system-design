function get(obj, keyStr) {
  const keys = keyStr.split(".");
  return keys.reduce((crntObj, key) => {
    if (!crntObj) return;
    return crntObj[key];
  }, obj);
}

const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(get(obj, "a.b.c"));
console.log(get(obj, "a.b.c.0"));
console.log(get(obj, "a.b.c.e"));



