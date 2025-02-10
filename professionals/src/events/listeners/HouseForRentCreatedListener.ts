// import { Message } from "node-nats-streaming";
// import { Listener } from "@sima-board/common";
// import { QUEUE_GROUP_NAME } from "../constants";
// import { HouseForRent } from "../../models/HouseForRent.archive";

// export enum Subjects {
//   HouseForRentCreated = "houseforrent:created",
// }

// export interface HouseForRentCreatedEventData {
//   subject: Subjects.HouseForRentCreated;
//   data: {
//     id: string;
//     title: string;
//     userId: string;
//     version: number;
//   };
// }

// export class HouseForRentCreatedListener extends Listener<HouseForRentCreatedEventData> {
//   readonly subject = Subjects.HouseForRentCreated;
//   queueGroupame = QUEUE_GROUP_NAME;

//   async onMessage(data: HouseForRentCreatedEventData["data"], msg: Message) {
//     const { title, id, userId, version } = data;

//     const houseForRent = new HouseForRent({
//       _id: id,
//       title,
//       userId,
//       version,
//     });

//     await houseForRent.save();

//     msg.ack();
//   }
// }
