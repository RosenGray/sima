import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });
    return new Promise<void>((resolove, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to Nats");
        resolove();
      });
      this.client.on("error", (err) => {
        console.log("Error connecting to nats");
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
