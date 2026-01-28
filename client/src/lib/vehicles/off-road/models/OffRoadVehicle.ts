import { FileUploadItem } from "@/lib/files/uploadFiles";
import { TransmissionType } from "@/lib/vehicles/cars/types/cars.types";
import mongoose from "mongoose";

import "@/lib/auth/models/User.ts";

export interface IOffRoadVehicle {
  id: string;
  publicId: string;
  user: mongoose.Types.ObjectId;
  manufacturer: string;
  model: string;
  yearOfManufacture: number;
  numberOfHand: number;
  transmission: TransmissionType;
  mileage?: number;
  numberOfDoors?: number;
  color?: string;
  price: number;
  description: string;
  district: string;
  city: string;
  contactName: string;
  contactPrimaryPhone: string;
  contactSecondaryPhone?: string;
  contactEmail: string;
  acceptTerms: boolean;
  images: FileUploadItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

const imageSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    uniqueName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    fieldname: {
      type: String,
      required: true,
    },
    versionId: {
      type: String,
      required: false,
    },
    folderName: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const offRoadVehicleSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    manufacturer: {
      type: String,
      required: true,
      index: true,
    },
    model: {
      type: String,
      required: true,
      index: true,
    },
    yearOfManufacture: {
      type: Number,
      required: true,
      min: 1900,
    },
    numberOfHand: {
      type: Number,
      required: true,
      min: 1,
    },
    transmission: {
      type: String,
      required: true,
      enum: TransmissionType,
    },
    mileage: {
      type: Number,
      required: false,
      min: 0,
    },
    numberOfDoors: {
      type: Number,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
      index: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    contactPrimaryPhone: {
      type: String,
      required: true,
    },
    contactSecondaryPhone: {
      type: String,
      required: false,
    },
    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    acceptTerms: {
      type: Boolean,
      required: true,
    },
    images: {
      type: [imageSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        ret.updatedAt = (ret.updatedAt as Date)?.toISOString();
        ret.createdAt = (ret.createdAt as Date)?.toISOString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

offRoadVehicleSchema.index({
  description: "text",
  manufacturer: "text",
  model: "text",
  city: "text",
});

export const OffRoadVehicle =
  mongoose.models.OffRoadVehicle ||
  mongoose.model<IOffRoadVehicle>("OffRoadVehicle", offRoadVehicleSchema);
