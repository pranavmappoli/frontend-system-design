function myPromise(callbackFn) {
  let onResolve;
  let onReject;
  let value;
  let error;
  let isFulfilled = false; // Single flag for both resolved & rejected

  this.then = function (thenHandler) {
    return new myPromise((resolve, reject) => {
      onResolve = function (val) {
        try {
          const result = thenHandler(val);
          if (result instanceof myPromise) {
            result.then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };
      if (isFulfilled && value !== undefined) {
        onResolve(value);
      }
    });
  };

  this.catch = function (catchHandler) {
    return new myPromise((resolve, reject) => {
      onReject = function (err) {
        try {
          const result = catchHandler(err);
          if (result instanceof myPromise) {
            result.then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        } catch (catchErr) {
          reject(catchErr);
        }
      };
      if (isFulfilled && error !== undefined) {
        onReject(error);
      }
    });
  };

  function resolve(val) {
    if (!isFulfilled) {
      isFulfilled = true;
      value = val;
      if (onResolve) {
        onResolve(val);
      }
    }
  }

  function reject(err) {
    if (!isFulfilled) {
      isFulfilled = true;
      error = err;
      if (onReject) {
        onReject(err);
      }
    }
  }

  callbackFn(resolve, reject);
}

// Example Usage:

new myPromise((res) => setTimeout(() => res(500), 1000)).then(console.log);

new myPromise((_, rej) => rej(1000)).catch(console.log);

new myPromise((res) => setTimeout(() => res(500), 1000))
  .then((val) => {
    console.log("First then:", val);
    return val * 2;
  })
  .then((val) => {
    console.log("Second then:", val);
    return val * 2;
  })
  .then((val) => {
    console.log("Third then:", val);
  })
  .catch((err) => {
    console.log("Error:", err);
  });
