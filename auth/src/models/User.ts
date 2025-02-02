import mongoose, { Document } from "mongoose";
import {PasswordManager} from '../services/PasswordManager';

interface IUser {
  firstName:string;
  lastName:string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
}

const userSchema = new mongoose.Schema({
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
  }
},{
  timestamps:true,
  toJSON:{
    transform:(doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.pre('save', async function(done){
  if(this.isModified('password')){
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password',hashed);
  }
  done();
});

export const User = mongoose.model<IUser>("User", userSchema);