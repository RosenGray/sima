import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./NatsWrapper";

const realestateServiceStart = async () => {
  
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONG_URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  const {MONGO_URI,NATS_CLIENT_ID,NATS_CLUSTER_ID,NATS_URL} = process.env;
  try {
    await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);
    await mongoose.connect(MONGO_URI);
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    console.log("connecting to mongodb");
  } catch (error) {
    console.log("mongodb-connection error:", error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

realestateServiceStart();
