import { Stan } from "node-nats-streaming";

interface EventData<T> {
  subject: T;
  data: unknown;
}

export abstract class Publisher<T extends EventData<string>> {
  abstract subject: T["subject"];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) reject(err);
        console.log("Event Published to subject:", this.subject);
        resolve();
      });
    });
  }
}