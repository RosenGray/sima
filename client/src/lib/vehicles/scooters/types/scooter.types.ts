import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { IScooter } from "../models/Scooter";


export interface SerializedScooter
  extends Omit<IScooter, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
