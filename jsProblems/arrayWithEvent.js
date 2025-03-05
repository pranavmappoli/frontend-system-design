Array.prototype.addListener = function (eventName, callback) {
  if (!Object.prototype.hasOwnProperty.call(this, "listeners")) {
    Object.defineProperty(this, "listeners", {
      value: {},
    });
  }
  this.listeners[eventName] = callback;
};

Array.prototype.pushWithEvent = function (eventName, values) {
  if (!values) return;
  this.push(...values);
  if (this.listeners[eventName])
    this.listeners[eventName](eventName, values, this);
};
Array.prototype.popWithEvent = function (eventName) {
  if (!this.length) return;
  const item = this.pop();
  if (this.listeners[eventName])
    this.listeners[eventName](eventName, item, this);
};

Array.prototype.removeListener = function (eventName) {
  if (this.listeners[eventName]) delete this.listeners[eventName];
};

const arr = [];
arr.addListener("add", (eventName, items, array) => {
  console.log("items were added", items);
});

arr.addListener("remove", (eventName, item, array) => {
  console.log(item, array, " was removed");
});

arr.pushWithEvent("add", [4, 5]);
arr.popWithEvent("remove");
