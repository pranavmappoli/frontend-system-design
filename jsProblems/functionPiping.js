const val = { salary: 10000 };

const getSalary = (person) => person.salary;
const addBonus = (netSalary) => netSalary + 1000;
const deductTax = (grossSalary) => grossSalary - grossSalary * 0.3;

function pipe(...fnctns) {
  return (val) => {
    return fnctns.reduce((acc, fn) => fn(acc), val);
  };
}

const result = pipe(getSalary, addBonus, deductTax)(val);
// console.log(result);

/**
 * function piping 2
 */

function Fn(obj) {
  return function (...params) {
    function dfs(obj) {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "function") {
          obj[key] = obj[key](...params);
          return;
        } else if (typeof obj[key] === "object") {
          dfs(obj[key]);
        }
      });
    }
    dfs(obj);
    return obj;
  };
}

const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

console.log(Fn(obj)(1, 1, 1));

// Output:
// {
//   a : {
//     b : 3,
//     c : 1
//   },
//   d: -1
// }
