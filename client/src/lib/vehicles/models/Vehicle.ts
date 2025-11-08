import { FileUploadResponse } from "@/app/api/files/create/route";
import mongoose from "mongoose";

import "@/lib/auth/models/User";

type UploadedFile = FileUploadResponse["files"][number];

export interface IVehicleImage extends UploadedFile {
  id: string;
}

export interface IVehicle {
  id: string;
  publicId: string;
  user: mongoose.Types.ObjectId;
  type: string;
  manufacturer: string;
  model: string;
  yearOfManufacture: number;
  ownershipNumber: number;
  transmission: "manual" | "automatic" | "tiptronic" | "robotic";
  engineType: "gasoline" | "diesel" | "turboDiesel" | "hybrid" | "electric";
  engineCapacity?: number;
  mileage?: number;
  numberOfDoors?: number;
  color?: string;
  price: number;
  description: string;
  accessories?: string;
  region: string;
  city: string;
  contactName: string;
  contactPrimaryPhone: string;
  contactSecondaryPhone?: string;
  contactEmail: string;
  acceptTerms: boolean;
  acceptMarketing?: boolean;
  images: IVehicleImage[];
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

const vehicleSchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
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
    ownershipNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    transmission: {
      type: String,
      required: true,
      enum: ["manual", "automatic", "tiptronic", "robotic"],
    },
    engineType: {
      type: String,
      required: true,
      enum: ["gasoline", "diesel", "turboDiesel", "hybrid", "electric"],
    },
    engineCapacity: {
      type: Number,
      required: false,
      min: 0,
    },
    mileage: {
      type: Number,
      required: false,
      min: 0,
    },
    numberOfDoors: {
      type: Number,
      required: false,
      enum: [2, 3, 4, 5],
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
    accessories: {
      type: String,
      required: false,
    },
    region: {
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
    acceptMarketing: {
      type: Boolean,
      required: false,
      default: false,
    },
    images: {
      type: [imageSchema],
      required: true,
      validate: {
        validator: (value: unknown[]) => Array.isArray(value) && value.length > 0,
        message: "At least one image is required",
      },
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

vehicleSchema.index({
  description: "text",
  manufacturer: "text",
  model: "text",
  region: "text",
  city: "text",
});

export const Vehicle =
  mongoose.models.Vehicle ||
  mongoose.model<IVehicle>("Vehicle", vehicleSchema);
