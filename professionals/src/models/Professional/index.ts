import mongoose from "mongoose";

interface Image {
  src: string;
  versionId?: string;
}

export interface IProfessional {
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  area: string;
  city: string;
  description: string;
  email: string;
  phoneNumber: string;
  acceptTerms: boolean;
  images: Image[];
}

const professionalSchema = new mongoose.Schema(
  {
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
    area: {
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
      type: [
        {
          src: {
            type: String,
            required: true,
          },
          versionId: {
            type: String,
            required: false,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Professional = mongoose.model<IProfessional>(
  "Professional",
  professionalSchema
);
