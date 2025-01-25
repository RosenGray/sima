import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError, ServerErrorType } from "@sima-board/common";



const { JWT_KEY, NODE_ENV, DB_USERNAME, DB_PASSWORD } = process.env;


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
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connecting to mongodb");
  } catch (error) {
    console.log("mongodb-connection error:", error);
    throw new DatabaseConnectionError("Error connecting to db", ServerErrorType.DatabaseConnection);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

authServiceStart();
