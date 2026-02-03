import { FileUploadItem } from "@/lib/files/uploadFiles";
import {
  PropertyKind,
  AirConditioning,
  Parking,
  AdditionalFeatures,
  Furniture,
  EntryDate,
} from "../types/realEstateForRent.types";
import mongoose from "mongoose";

import "@/lib/auth/models/User.ts";

export interface IRealEstateForRent {
  id: string;
  publicId: string;
  user: mongoose.Types.ObjectId;
  propertyKind: PropertyKind;
  district: string;
  city: string;
  streetname: string;
  numberOfRooms: number;
  airconditioning: AirConditioning;
  balcony: number;
  parking: Parking;
  squaremeter: number;
  propertyTax?: number;
  floor: number;
  totalflors: number;
  additionalFeatures?: AdditionalFeatures[];
  furniture: Furniture;
  furnitureDescription?: string;
  description: string;
  price: number;
  annualPayments: number;
  year: number;
  month: number;
  day: number;
  entryDate: EntryDate;
  images: FileUploadItem[];
  contactName: string;
  contactPrimaryPhone: string;
  contactSecondaryPhone?: string;
  contactEmail: string;
  acceptTerms: boolean;
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

const realEstateForRentSchema = new mongoose.Schema(
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
    propertyKind: {
      type: Number,
      required: true,
      enum: Object.values(PropertyKind).filter(
        (v): v is PropertyKind => typeof v === "number"
      ),
      index: true,
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
    streetname: {
      type: String,
      required: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
      index: true,
    },
    airconditioning: {
      type: Number,
      required: true,
      enum: [
        AirConditioning.None,
        AirConditioning.InRooms,
        AirConditioning.InRoomsAndLivingRoom,
        AirConditioning.InLivingRoom,
        AirConditioning.Central,
        AirConditioning.MiniCentral,
        AirConditioning.Split,
      ],
    },
    balcony: {
      type: Number,
      required: true,
      min: 0,
      max: 4,
    },
    parking: {
      type: Number,
      required: true,
      enum: [
        Parking.None,
        Parking.InTheStreet,
        Parking.Shared,
        Parking.PayedParking,
        Parking.PrivateCovered,
        Parking.PrivateUncovered,
      ],
    },
    squaremeter: {
      type: Number,
      required: true,
      min: 0,
    },
    propertyTax: {
      type: Number,
      required: false,
      min: 0,
    },
    floor: {
      type: Number,
      required: true,
      min: -1,
      max: 50,
    },
    totalflors: {
      type: Number,
      required: true,
      min: -1,
      max: 50,
    },
    additionalFeatures: {
      type: [Number],
      required: false,
      enum: [
        AdditionalFeatures.Bars,
        AdditionalFeatures.Elevator,
        AdditionalFeatures.ForRoommates,
        AdditionalFeatures.Warehouse,
        AdditionalFeatures.Shelter,
        AdditionalFeatures.PetsSuitable,
        AdditionalFeatures.SolarHeater,
        AdditionalFeatures.Renovated,
      ],
    },
    furniture: {
      type: Number,
      required: true,
      enum: [Furniture.None, Furniture.Partial, Furniture.Full],
    },
    furnitureDescription: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    annualPayments: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    day: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
    entryDate: {
      type: Number,
      required: true,
      enum: [EntryDate.Immediate, EntryDate.Flexible],
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

realEstateForRentSchema.index({
  description: "text",
  streetname: "text",
});

export const RealEstateForRent =
  mongoose.models.RealEstateForRent ||
  mongoose.model<IRealEstateForRent>(
    "RealEstateForRent",
    realEstateForRentSchema
  );
