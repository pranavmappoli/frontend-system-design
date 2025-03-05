function throttle(fn, items, count, time) {
  if (!items?.length) return;
  fn.call(this, items.slice(0, count + 1));
  setTimeout(() => {
    const nextArr = items.splice(count + 1);
    throttle(fn, nextArr, count, time);
  }, time);
}

const task = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const count = 5;

throttle(
  (items) => {
    console.log(items);
  },
  task,
  count,
  2000
); // [1, 2, 3, 4, 5] // immediately
