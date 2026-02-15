import mongoose from "mongoose";

// Import referenced models to ensure they are registered before this model
import "@/lib/auth/models/User";
import "@/lib/service-categories/models/ServiceCategory";
import "@/lib/service-categories/models/ServiceSubCategory";
import { FileUploadItem } from "@/lib/files/uploadFiles";

export interface ISocialLinks {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

export interface IProfessionalPage {
  id: string;
  publicId: string;
  slug: string;
  slugPrefix: string;
  user: mongoose.Types.ObjectId;
  displayName: string;
  description: string;
  profileImage?: FileUploadItem;
  galleryImages: FileUploadItem[];
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  district: string;
  city: string;
  contactPhone: string;
  contactEmail: string;
  socialLinks?: ISocialLinks;
  isPublished: boolean;
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

const socialLinksSchema = new mongoose.Schema(
  {
    whatsapp: { type: String, required: false },
    instagram: { type: String, required: false },
    facebook: { type: String, required: false },
    website: { type: String, required: false },
  },
  { _id: false }
);

const professionalPageSchema = new mongoose.Schema<IProfessionalPage>(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slugPrefix: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profileImage: {
      type: imageSchema,
      required: false,
    },
    galleryImages: {
      type: [imageSchema],
      required: false,
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: false,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceSubCategory",
      required: false,
    },
    district: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    contactPhone: {
      type: String,
      required: false,
    },
    contactEmail: {
      type: String,
      required: false,
    },
    socialLinks: {
      type: socialLinksSchema,
      required: false,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: true,
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

export const ProfessionalPage =
  mongoose.models.ProfessionalPage ||
  mongoose.model<IProfessionalPage>(
    "ProfessionalPage",
    professionalPageSchema
  );
