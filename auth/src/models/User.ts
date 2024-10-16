import mongoose, { Document } from "mongoose";
import {PasswordManager} from '../services/PasswordManager';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{
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