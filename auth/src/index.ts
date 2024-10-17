import mongoose from "mongoose";
import { app } from "./app";

const authServiceStart = async () => {
  console.log('some changes');
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONG_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connecting to mongodb");
  } catch (error) {
    console.log("mongodb-connection error:", error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

authServiceStart();
