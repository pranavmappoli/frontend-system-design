function setClearAllTimeOutFn() {
  const nativeTimeOut = window.setTimeout;
  window.timeouts = [];
  window.setTimeout = function (fn, time, ...args) {
    const timer = nativeTimeOut(fn, time, ...args);
    window.timeouts.push(timer);
    return timer;
  };
  window.clearAllTimeOut = function () {
    window.timeouts?.forEach((timer) => clearTimeout(timer));
    window.timeouts = [];
  };
}
setClearAllTimeOutFn();
