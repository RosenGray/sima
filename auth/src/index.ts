import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError, ServerErrorType } from "@sima-board/common";
import { natsWrapper } from "./NatsWrapper";

const {
  JWT_KEY,
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  NATS_CLIENT_ID,
  NATS_CLUSTER_ID,
  NATS_URL,
} = process.env;

console.log(NATS_CLIENT_ID, NATS_CLUSTER_ID, NATS_URL, "auth");
const isProd = NODE_ENV === "production";
const MONGO_URI = isProd
  ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@simacluster.iwsya.mongodb.net/auth`
  : "mongodb://auth-mongo-srv:27017/auth";

const authServiceStart = async () => {
  console.log("starting auth service...");
  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!MONGO_URI) {
    throw new Error("MONG_URI must be defined");
  }
  if (!NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  try {
    await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);
    await mongoose.connect(MONGO_URI);
    console.log("connecting to mongodb");
  } catch (error) {
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    console.log("mongodb-connection error:", error);
    throw new DatabaseConnectionError(
      "Error connecting to db",
      ServerErrorType.DatabaseConnection
    );
  }
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

authServiceStart();
