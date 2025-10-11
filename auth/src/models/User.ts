import mongoose, { Document } from "mongoose";
import { PasswordManager } from "../services/PasswordManager";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  hasPrivateProfessionalPage?: boolean;
}

const userSchema = new mongoose.Schema(
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
    hasPrivateProfessionalPage: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        console.log("ret", ret);

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

export const User = mongoose.model<IUser>("User", userSchema);

export type IUserDocument = Document<unknown, {}, IUser> & IUser;
