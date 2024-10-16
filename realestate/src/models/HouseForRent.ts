import mongoose, { Document } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
interface IHouseForRent {
  title: string;
  userId: string;
  version:number;
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
hoseForRentSchema.set("versionKey", "version");
hoseForRentSchema.plugin(updateIfCurrentPlugin);

export const HouseForRent = mongoose.model<IHouseForRent>(
  "HouseForRent",
  hoseForRentSchema
);

