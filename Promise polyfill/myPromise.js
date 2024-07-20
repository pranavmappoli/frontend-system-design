function myPromise(callbackFn) {
  let onResolve;
  let onReject;
  let value;
  let isResolved;
  let isRejected;
  let error;
  let isCalled = false;

  //then without chaining
  //   this.then = function (thenHandler) {
  //     onResolve = thenHandler;
  //     if (isResolved && !isCalled) {
  //       onResolve(value);
  //     }
  //     return this;
  //   };

  //   this.catch = function (catchHandler) {
  //     onReject = catchHandler;
  //     if (isRejected && !isCalled) {
  //       onReject(error);
  //     }
  //     return this;
  //   };

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
      if (isResolved) {
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
      if (isRejected) {
        onReject(error);
      }
    });
  };

  function resolve(val) {
    isResolved = true;
    value = val;
    if (onResolve && !isCalled) {
      onResolve(val);
    }
  }

  function reject(err) {
    isRejected = true;
    error = err;
    if (onReject && !isCalled) {
      onReject(error);
    }
  }

  callbackFn(resolve, reject);
}

// export default myPromise;

new myPromise((res, rej) => setTimeout(() => res(500), 1000)).then((val) =>
  console.log(val)
);
new myPromise((res, rej) => rej(1000))
  .then((val) => {})
  .catch((err) => console.log(err));

new myPromise((res, rej) => setTimeout(() => res(500), 1000))
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
