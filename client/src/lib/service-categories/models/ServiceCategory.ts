import mongoose from "mongoose";

export interface IServiceCategory {
  key: string;
  displayName: string;
  description: string;
  russianDisplayName: string;
  russianDescription: string;
}

const serviceCategorySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    enum: ['ConstructionRepair', 'ApplianceRepair', 'Legal', 'Medical', 
           'Transportation', 'SecurityInstallation', 'ItAdvertising', 
           'Education', 'Business', 'Household',"Other"]
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
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret: Record<string, unknown>) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      ret.updatedAt = (ret.updatedAt as Date)?.toISOString();
      ret.createdAt = (ret.createdAt as Date)?.toISOString();
    }
  }
});


export const ServiceCategory = mongoose.models.ServiceCategory || mongoose.model<IServiceCategory>("ServiceCategory", serviceCategorySchema);

