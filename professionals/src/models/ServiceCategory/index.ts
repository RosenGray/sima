import mongoose from "mongoose";

export interface IServiceCategory {
  id: string;
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
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const ServiceCategory = mongoose.model<IServiceCategory>("ServiceCategory", serviceCategorySchema);

