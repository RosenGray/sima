import { Message, Stan } from "node-nats-streaming";

interface EventData<T> {
  subject: T;
  data: unknown;
}

export abstract class Listener<T extends EventData<string>> {
    abstract subject: T['subject'];
    abstract queueGroupame: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;
  
    constructor(client: Stan) {
      this.client = client;
    }
  
    subscriptionOptions() {
      return this.client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this.ackWait)
        .setDurableName(this.queueGroupame);
    }
  
    listen() {
      const subscription = this.client.subscribe(
        this.subject,
        this.queueGroupame,
        this.subscriptionOptions()
      );
      subscription.on("message", (msg: Message) => {
        console.log(` Message received: ${this.subject} / ${this.queueGroupame}`);
        const parsedData = this.parseMessage(msg);
        this.onMessage(parsedData, msg);
      });
    }
  
    parseMessage(msg: Message) {
      const data = msg.getData();
      return typeof data === "string"
        ? JSON.parse(data)
        : JSON.parse(data.toString("utf8"));
    }
  }
  