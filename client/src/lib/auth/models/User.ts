import mongoose from "mongoose";
import { PasswordManager } from "../services/PasswordManager";


export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
  emailVerificationToken?: string;
  emailVerificationTokenExpiresAt?: Date;
  isEmailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  hasPrivateProfessionalPage?: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      lastName: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpiresAt: {
      type: Date,
      required: false,
    },
    emailVerificationToken: {
      type: String,
      required: false,
    },
    emailVerificationTokenExpiresAt: {
      type: Date,
      required: false,
    },
    isEmailVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasPrivateProfessionalPage: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);


