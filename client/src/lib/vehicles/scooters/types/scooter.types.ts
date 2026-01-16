import { IScooter } from "../models/Scooter";
import { SerializedUser } from "@/lib/auth/types/auth.schema";

export interface SerializedScooter
  extends Omit<IScooter, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
