import mongoose, { Document } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface HouseForRentDoc extends mongoose.Document{
  title: string;
  userId: string;
  version: number;
}

interface HouseForRentUpdatedEvent {
  id: string;
  version: number;
}

interface HouseForRenModel extends mongoose.Model<HouseForRentDoc> {
  findByEvent: (
    event: HouseForRentUpdatedEvent
  ) => Promise<HouseForRentDoc | null>;
}

const hoseForRentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
hoseForRentSchema.statics.findByEvent = async (
  event: HouseForRentUpdatedEvent
) => {
  return await HouseForRent.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
hoseForRentSchema.set("versionKey", "version");
hoseForRentSchema.plugin(updateIfCurrentPlugin);
export const HouseForRent = mongoose.model<HouseForRentDoc, HouseForRenModel>(
  "sadsadsa",
  hoseForRentSchema
);
