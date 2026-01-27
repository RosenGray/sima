import mongoose from "mongoose";
import { DatabaseConnectionError, ServerErrorType } from "@sima-board/common";

// Cache the connection promise to prevent multiple simultaneous connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If we have a cached connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If mongoose is already connected (e.g., in tests with Memory Server), return the existing connection
  if (mongoose.connection.readyState === 1) {
    cached.conn = mongoose.connection;
    return cached.conn;
  }

  // Validate environment variables
  const { JWT_KEY, NODE_ENV, DB_USERNAME, DB_PASSWORD, MONGO_URI: ENV_MONGO_URI } = process.env;

  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  const isProd = NODE_ENV === "production";
  
  const MONGO_URI = ENV_MONGO_URI || (isProd
    ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@simacluster.iwsya.mongodb.net/sima`
    : "mongodb://localhost:30016/sima");

  if (!MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  // If connection is in progress, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering to fail fast
      maxPoolSize: 10, // Maximum number of connections
      minPoolSize: 2, // Minimum number of connections
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      retryReads: true,
    };

    console.log("Connecting to MongoDB...");
    
    try {
      cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
        console.log("✓ Connected to MongoDB");
        return mongoose;
      });
    } catch (error) {
      cached.promise = null; // Reset on failure
      console.error("MongoDB connection error:", error);
      throw new DatabaseConnectionError(
        "Error connecting to db",
        ServerErrorType.DatabaseConnection
      );
    }
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise on error
    cached.conn = null;
    console.error("Failed to establish MongoDB connection:", error);
    throw new DatabaseConnectionError(
      "Error connecting to db",
      ServerErrorType.DatabaseConnection
    );
  }
};

// Monitor connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected event");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected - will reconnect automatically");
  cached.conn = null;
  cached.promise = null;
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  cached.conn = null;
  cached.promise = null;
});

// Graceful shutdown
if (process.env.NODE_ENV !== 'production') {
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
}

export default connectDB;