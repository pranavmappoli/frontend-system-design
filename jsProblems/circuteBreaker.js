/**
 * errorCountVariable
 * if its catch, check errorCount, if its above threshold we use setTimeout, clear the errorCount, call it again
 */

function circuitBreaker(fn, retryLimit, time) {
  let retryCount = 0;
  let isHalted = false;
  return function circuite() {
    try {
      if (isHalted) {
        console.log("service not available");
        return;
      }
      return fn();
    } catch (e) {
      retryCount += 1;
      console.log("error");
      if (retryCount >= retryLimit) {
        isHalted = true;
        setTimeout(() => {
          isHalted = false;
          retryCount = 0;
        }, time);
      }
    }
  };
}

const testFunction = () => {
  let count = 0;

  return function () {
    count++;
    if (count < 4) {
      throw "failed";
    } else {
      return "hello";
    }
  };
};

let t = testFunction();
let c = circuitBreaker(t, 3, 200);

c(); // "error"
c(); // "error"
c(); // "error"

// service is closed for 200 MS
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"
