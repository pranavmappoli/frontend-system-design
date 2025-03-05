class AnalyticSDK {
  constructor() {
    this.queue = [];
    this.processed = 0;
  }
  logEvent(event) {
    this.queue.push(event);
  }
  async #sendData(log) {
    try {
      this.processed += 1;
      if (this.processed % 5 == 0) {
        this.processed = 0;
        throw "error";
      }
      console.log(log, this.queue.length);
    } catch {
      console.log("failed", log);
      return this.#sendData(log);
    }
  }
  async send() {
    while (this.queue.length) {
      const data = this.queue.shift();
      await new Promise(async (res) => {
        setTimeout(async () => {
          await this.#sendData(data);
          res();
        }, 1000);
      });
    }
  }
}

const sdk = new AnalyticSDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.send();
