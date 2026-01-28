import { FileUploadItem } from "@/lib/files/uploadFiles";
import {
  PetGender,
  PetAge,
  PetAdjustments,
} from "@/lib/pets/for-sale/types/petForSale.types";
import mongoose from "mongoose";

import "@/lib/auth/models/User.ts";

export interface IPetForFree {
  id: string;
  publicId: string;
  user: mongoose.Types.ObjectId;
  animal: string;
  kind: string;
  gender: PetGender;
  age: PetAge;
  adjustments?: PetAdjustments[];
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

const petForFreeSchema = new mongoose.Schema(
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
    animal: {
      type: String,
      required: true,
      index: true,
    },
    kind: {
      type: String,
      required: true,
      index: true,
    },
    gender: {
      type: Number,
      required: true,
      enum: [PetGender.MALE, PetGender.FEMALE],
    },
    age: {
      type: Number,
      required: true,
      enum: [PetAge.PUPPY, PetAge.YOUNG, PetAge.ADULT, PetAge.GROWN],
    },
    adjustments: {
      type: [Number],
      required: false,
      enum: [
        PetAdjustments.Spayed,
        PetAdjustments.Neutered,
        PetAdjustments.Vaccinated,
        PetAdjustments.Trained,
        PetAdjustments.KidsFriendly,
        PetAdjustments.YardSuitable,
        PetAdjustments.DogsFriendly,
        PetAdjustments.ApartmentSuitable,
        PetAdjustments.AdultsFriendly,
      ],
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

petForFreeSchema.index({
  description: "text",
  animal: "text",
  kind: "text",
});

export const PetForFree =
  mongoose.models.PetForFree ||
  mongoose.model<IPetForFree>("PetForFree", petForFreeSchema);
