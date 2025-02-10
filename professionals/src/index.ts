import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./NatsWrapper";
// import { HouseForRentCreatedListener } from "./events/listeners/HouseForRentCreatedListener";
// import { HouseForRentUpdatedListener } from "./events/listeners/HouseForRentUpdatedListener";

const {
  NATS_CLIENT_ID,
  NATS_CLUSTER_ID,
  NATS_URL,
  JWT_KEY,
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const isProd = NODE_ENV === "production";
const MONGO_URI = isProd
  ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@simacluster.iwsya.mongodb.net/professionals`
  : "mongodb://professionals-mongo-srv:27017/professionals";

const professionalsServiceStart = async () => {
  console.log("starting professionals service...");
  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
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
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    // new HouseForRentCreatedListener(natsWrapper.client).listen();
    // new HouseForRentUpdatedListener(natsWrapper.client).listen();
    console.log("connecting to mongodb");
  } catch (error) {
    console.log("mongodb-connection error:", error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

professionalsServiceStart();
