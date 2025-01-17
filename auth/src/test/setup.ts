import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

let mongo: any;

declare global {
  var login: () => Promise<string[]>;
}

global.login = async () => {
  const firstName = "Alon";
  const lastName = "Levi";
  const email = "test@test.com";
  const password = "Password123";
  const confirmPassword = "Password123";
  const response = await request(app)
    .post("/api/users/register")
    .field("firstName", firstName)
    .field("lastName", lastName)
    .field("email", email)
    .field("password", password)
    .field("confirmPassword", password)
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie!;
};
beforeAll(async () => {
  process.env.JWT_KEY = "RosenGray";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
