import { FileUploadItem } from "@/lib/files/uploadFiles";
import {
  DealKind,
  CommercialPropertyKind,
  AdditionalFeatures,
} from "../types/commercialRealEstate.types";
import mongoose from "mongoose";

import "@/lib/auth/models/User.ts";

export interface ICommercialRealEstate {
  id: string;
  publicId: string;
  user: mongoose.Types.ObjectId;
  dealKind: DealKind;
  propertyKind: CommercialPropertyKind;
  district: string;
  city: string;
  streetname: string;
  squaremeter: number;
  additionalFeatures?: AdditionalFeatures[];
  description: string;
  price: number;
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

const commercialRealEstateSchema = new mongoose.Schema(
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
    dealKind: {
      type: Number,
      required: true,
      enum: Object.values(DealKind).filter(
        (v): v is DealKind => typeof v === "number"
      ),
      index: true,
    },
    propertyKind: {
      type: Number,
      required: true,
      enum: Object.values(CommercialPropertyKind).filter(
        (v): v is CommercialPropertyKind => typeof v === "number"
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
    squaremeter: {
      type: Number,
      required: true,
      min: 0,
    },
    additionalFeatures: {
      type: [Number],
      required: false,
      enum: [
        AdditionalFeatures.Shelter,
        AdditionalFeatures.Guard,
        AdditionalFeatures.Accessible,
        AdditionalFeatures.Alarm,
        AdditionalFeatures.Kitchen,
        AdditionalFeatures.MeetingRoom,
        AdditionalFeatures.ReceptionDesk,
      ],
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
    images: {
      type: [imageSchema],
      required: true,
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
    },
    acceptTerms: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const CommercialRealEstate =
  mongoose.models.CommercialRealEstate ||
  mongoose.model<ICommercialRealEstate>(
    "CommercialRealEstate",
    commercialRealEstateSchema
  );
