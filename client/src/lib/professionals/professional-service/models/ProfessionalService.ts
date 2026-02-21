import mongoose from "mongoose";

// Import referenced models to ensure they are registered before this model
import "@/lib/auth/models/User";
import "@/lib/service-categories/models/ServiceCategory";
import "@/lib/service-categories/models/ServiceSubCategory";
import { FileUploadResponse } from "@/lib/files/uploadFiles";

export interface IProfessionalService {
  id: string;
  publicId: string;
  user: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  district: string;
  city: string;
  description: string;
  email: string;
  phoneNumber: string;
  acceptTerms: boolean;
  images: FileUploadResponse["files"];
  slug?: string;
  slugPrefix?: string;
  fullSlug?: string;
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

const professionalServiceSchema = new mongoose.Schema(
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
      index: true, // Index for faster queries
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceSubCategory",
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    acceptTerms: {
      type: Boolean,
      required: true,
    },
    images: {
      type: [imageSchema],
      required: true,
    },
    slug: {
      type: String,
      required: false,
    },
    slugPrefix: {
      type: String,
      required: false,
    },
    fullSlug: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        ret.updatedAt = (ret.updatedAt as Date)?.toISOString();
        ret.createdAt = (ret.createdAt as Date)?.toISOString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Add text index for efficient text search
professionalServiceSchema.index({
  description: "text",
  district: "text",
  city: "text",
  email: "text",
});

export const ProfessionalService =
  mongoose.models.ProfessionalService ||
  mongoose.model<IProfessionalService>(
    "ProfessionalService",
    professionalServiceSchema
  );
