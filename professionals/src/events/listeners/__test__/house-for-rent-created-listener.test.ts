// import mongoose from "mongoose";
// import { natsWrapper } from "../../../NatsWrapper";
// import {
//   HouseForRentCreatedEventData,
//   HouseForRentCreatedListener,
// } from "../HouseForRentCreatedListener";
// import { Message } from "node-nats-streaming";
// import { HouseForRent } from "../../../models/HouseForRent";

// jest.mock("../../../NatsWrapper");

// const setup = async () => {
//   //create an instance of the listener
//   const listener = new HouseForRentCreatedListener(natsWrapper.client);

//   // create a fake data event
//   const data: HouseForRentCreatedEventData["data"] = {
//     version: 0,
//     id: new mongoose.Types.ObjectId().toHexString(),
//     title: "Test Title",
//     userId: new mongoose.Types.ObjectId().toHexString(),
//   };
//   // create a fake message object
//   // @ts-ignore
//   const msg: Message = {
//     ack: jest.fn(),
//   };

//   return { listener, data, msg };
// };

// it("creates and saves a ticket", async () => {
//   const { listener, data, msg } = await setup();

//   await listener.onMessage(data, msg);

//   const houseForRent = await HouseForRent.findById(data.id);


//   expect(houseForRent).toBeDefined();
//   expect(houseForRent!.title).toEqual(data.title);
// });

// it("acks the message", async () => {
//   const { listener, data, msg } = await setup();

//   await listener.onMessage(data, msg);


//   expect(msg.ack).toHaveBeenCalled();

// });
