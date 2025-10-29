import mongoose from "mongoose";

export interface IServiceCategory {
  key: string;
  displayName: string;
  description: string;
  russianDisplayName: string;
  russianDescription: string;
  navItem?: { label: string; href: string };
}

export const NavItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});

const serviceCategorySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "ConstructionRepair",
        "ApplianceRepair",
        "Legal",
        "Medical",
        "Transportation",
        "SecurityInstallation",
        "ItAdvertising",
        "Education",
        "Business",
        "Household",
        "Other",
      ],
    },
    displayName: {
      type: String,
      required: true,
    },
    description: {
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
    navItem: {
      type: NavItemSchema,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.updatedAt = (ret.updatedAt as Date)?.toISOString();
        ret.createdAt = (ret.createdAt as Date)?.toISOString();
      },
    },
  }
);

export const ServiceCategory =
  mongoose.models.ServiceCategory ||
  mongoose.model<IServiceCategory>("ServiceCategory", serviceCategorySchema);
