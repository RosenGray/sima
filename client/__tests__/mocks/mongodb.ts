import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer | null = null;

/**
 * Setup MongoDB Memory Server for testing
 * @returns MongoDB Memory Server instance and connection URI
 */
export async function setupMongoMemoryServer(): Promise<{
  mongoServer: MongoMemoryServer;
  uri: string;
}> {
  // Create an instance of MongoDB Memory Server
  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: "test-db",
    },
  });

  const uri = mongoServer.getUri();

  // Connect to the in-memory database
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }

  return { mongoServer, uri };
}

/**
 * Teardown MongoDB Memory Server
 */
export async function teardownMongoMemoryServer(
  server: MongoMemoryServer | null
): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  if (server) {
    await server.stop();
  }

  mongoServer = null;
}

/**
 * Clear all collections in the database
 */
export async function clearDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    throw new Error("Database not connected. Call setupMongoMemoryServer first.");
  }

  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

/**
 * Get the current MongoDB Memory Server instance
 */
export function getMongoServer(): MongoMemoryServer | null {
  return mongoServer;
}

/**
 * Helper to setup database before each test
 */
export async function setupTestDatabase(): Promise<MongoMemoryServer> {
  const { mongoServer: server } = await setupMongoMemoryServer();
  return server;
}

/**
 * Helper to teardown database after each test
 */
export async function teardownTestDatabase(
  server: MongoMemoryServer | null
): Promise<void> {
  await teardownMongoMemoryServer(server);
}
