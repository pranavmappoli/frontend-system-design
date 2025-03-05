async function fetchWithTimeOut(url, time) {
  return new Promise((res, rej) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(url, { signal })
      .then((val) => {
        res(val);
      })
      .catch((err) => rej(err));

    setTimeout(() => {
      rej();
      abortController.abort();
    }, time);
  });
}
