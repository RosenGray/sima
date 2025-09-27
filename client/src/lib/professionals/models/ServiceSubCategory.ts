import mongoose from "mongoose";

export interface IServiceSubCategory {
  key: string;
  displayName: string;
  description: string;
  russianDisplayName: string;
  russianDescription: string;
  serviceCategory: mongoose.Types.ObjectId;
  serviceCategoryKey: string;
}

const serviceSubCategorySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    serviceCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
    serviceCategoryKey: {
      type: String,
      required: true,
    },
    russianDisplayName: {
      type: String,
      required: true,
    },
    russianDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
        transform: (doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const ServiceSubCategory = mongoose.models.ServiceSubCategory || mongoose.model<IServiceSubCategory>(
  "ServiceSubCategory",
  serviceSubCategorySchema
);

