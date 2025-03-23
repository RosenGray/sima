// import { Message } from "node-nats-streaming";
// import { Listener } from "@sima-board/common";
// import { QUEUE_GROUP_NAME } from "../constants";
// import { HouseForRent } from "../../models/HouseForRent.archive";

// export enum Subjects {
//   HouseForRentUpdated = "houseforrent:updated",
// }

// export interface HouseForRentUpdatedEventData {
//   subject: Subjects.HouseForRentUpdated;
//   data: {
//     id: string;
//     title: string;
//     userId: string;
//     version: number;
//   };
// }

// export class HouseForRentUpdatedListener extends Listener<HouseForRentUpdatedEventData> {
//   readonly subject = Subjects.HouseForRentUpdated;
//   queueGroupame = QUEUE_GROUP_NAME;

//   async onMessage(data: HouseForRentUpdatedEventData["data"], msg: Message) {
//     const { id, version } = data;

//     const houseForRent = await HouseForRent.findByEvent({ id, version });
// console.log(1,version)
//     if (!houseForRent) {
//       throw new Error("House For Rent not found");
//     }

//     const { title } = data;
//     houseForRent.set({ title });
//     console.log("houseForRent,houseForRent", houseForRent);
//     await houseForRent.save();

//     console.log(houseForRent);

//     msg.ack();
//   }
// }
