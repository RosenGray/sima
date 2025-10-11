'use server';

import mongoose from "mongoose";
import { DatabaseConnectionError, ServerErrorType } from "@sima-board/common";

let isConnected = false;

const connectDB = async () => {
  // Validate environment variables at runtime
  const { JWT_KEY, NODE_ENV, DB_USERNAME, DB_PASSWORD } = process.env;

  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  const isProd = NODE_ENV === "production";
  const MONGO_URI = isProd
    ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@simacluster.iwsya.mongodb.net/sima`
    : "mongodb://localhost:30016/sima";

  if (!MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    console.log("MongoDB connection already established");
    return;
  }

  if (mongoose.connection.readyState === 2) {
    console.log("MongoDB connection is connecting...");
    return;
  }

  console.log("Starting  service...");

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
    // Optional: Test connection
    const testCollection = mongoose.connection.db?.collection("test");
    await testCollection?.insertOne({
      message: "Database connected!",
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw new DatabaseConnectionError(
      "Error connecting to db",
      ServerErrorType.DatabaseConnection
    );
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
  isConnected = false;
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  isConnected = false;
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default connectDB;
