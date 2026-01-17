import { IYad2Item } from "../models/Yad2Item";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export interface SerializedYad2Item
  extends Omit<IYad2Item, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
