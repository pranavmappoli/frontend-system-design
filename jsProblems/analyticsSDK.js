/**
 * Implement an analytics SDK that exposes log events, it takes in events and queues them, and then starts sending the events. This is a Flipkart frontend interview question.

Send each event after a delay of 1 second and this logging fails every n % 5 times.
Send the next event only after the previous one resolves.
When the failure occurs attempt a retry.
 */

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
      console.log(log);
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
