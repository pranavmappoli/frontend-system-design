function cachedApi(timer) {
  let cache = {};
  return async (url, options = {}) => {
    try {
      if (cache[url]) return cache[url];
      const data = await fetch(url, options).then((res) => res.json());
      cache[url] = data;
      setTimeout(() => {
        delete cache[url];
      }, timer);
      return data;
    } catch {}
  };
}
