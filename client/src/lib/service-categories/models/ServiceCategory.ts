import mongoose from "mongoose";

export interface IServiceCategory {
  key: string;
  displayName: string;
  description: string;
  russianDisplayName: string;
  russianDescription: string;
  navItem?: { label: string; href: string; id: string };
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

        // Transform navItem if it exists
        if (ret.navItem && typeof ret.navItem === "object") {
          const navItem = ret.navItem as Record<string, unknown>;
          navItem.id = navItem._id;
          delete navItem._id;
        }
      },
    },
  }
);

serviceCategorySchema.pre("save", function (next) {
  // 'this' refers to the document being saved
  // _id is already generated at this point
  // Only modify href on document creation, not on updates

  if (this.isNew && this.navItem) {
    this.navItem.href = `/${this.navItem.href}/${this._id.toString()}`;
  }
  next();
});

export const ServiceCategory =
  mongoose.models.ServiceCategory ||
  mongoose.model<IServiceCategory>("ServiceCategory", serviceCategorySchema);
