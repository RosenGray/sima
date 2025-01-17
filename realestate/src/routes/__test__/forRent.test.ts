import request from "supertest";
import { app } from "../../app";
import { HouseForRent } from "../../models/HouseForRent";
import mongoose from "mongoose";
import { natsWrapper } from "../../NatsWrapper";

jest.mock("../../NatsWrapper");

it("has a route handler listening to /api/realestate/forrent for POST requests", async () => {
  const response = await request(app).post("/api/realestate/forrent").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/realestate/forrent").send({}).expect(401);
});

it("returs a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/realestate/forrent")
    .set("Cookie", global.login())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .get(`/api/realestate/forrent/${id}`)
    .send()
    .expect(404);
});

it("returns an error if an invalid price is provided", async () => {});

it("creates a ticket with valid inputs", async () => {
  let housesForRent = await HouseForRent.find({});
  expect(housesForRent.length).toEqual(0);

  await request(app)
    .post("/api/realestate/forrent")
    .set("Cookie", global.login())
    .send({
      title: "sometitle",
    })
    .expect(201);
  housesForRent = await HouseForRent.find({});
  expect(housesForRent.length).toEqual(1);
});

it("publishes an event", async () => {
  await request(app)
    .post("/api/realestate/forrent")
    .set("Cookie", global.login())
    .send({
      title: "sometitle",
    })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
