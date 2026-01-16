import { IMotorcycle } from "../models/Motorcycle";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export enum MotorcycleKind {
  MOTOCROSS = "мотокросс",
  DUAL_PURPOSE = "двойного назначения",
  SPORT_ROAD = "Спорт / дорога",
  OTHER = "другой",
}

export interface SerializedMotorcycle
  extends Omit<IMotorcycle, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
