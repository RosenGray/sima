import mongoose from "mongoose";
import { PasswordManager } from "../services/PasswordManager";
import { UserRole } from "../types/auth.scema";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  googleId?: string;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
  emailVerificationToken?: string;
  emailVerificationTokenExpiresAt?: Date;
  isEmailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  hasPrivateProfessionalPage?: boolean;
  acceptMarketing?: boolean;
  role: UserRole;
  lastSeenAt?: Date;
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
      required: false,
    },
    googleId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
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
    role: {
      type: Number,
      required: true,
      default: UserRole.User,
      enum: [UserRole.User, UserRole.Admin, UserRole.None],
    },
    acceptMarketing: {
      type: Boolean,
      required: false,
      default: false,
    },
    lastSeenAt: {
      type: Date,
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
  if (this.isModified("password") && this.get("password")) {
    const hashed = await PasswordManager.toHash(this.get("password") as string);
    this.set("password", hashed);
  }
  done();
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
