import { cookies } from "next/headers";
import { SIMA_AUTH_SESSION_CONFIG } from "../config";
import { IUser, User } from "../models/User";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { SerializedUser } from "../types/auth.scema";

export const jwtSignUser = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      hasPrivateProfessionalPage: user.hasPrivateProfessionalPage,
    },
    process.env.JWT_KEY!
  );
};
const serializeUser = (user: IUser):SerializedUser => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
    hasPrivateProfessionalPage: user.hasPrivateProfessionalPage,
  };
};
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SIMA_AUTH_SESSION_CONFIG.name)?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
      email: string;
    };
    if (!decoded) return null;

    await connectDB();
    const user = await User.findOne<IUser>({ email: decoded.email });
    if(!user) return null;
    const serializedUser = serializeUser(user);
    return serializedUser;
  } catch (_error) {
    console.log("error", _error);
    return null;
  }
}

// Create a middleware for protected pages
export async function requireAuthOrRedirectTo(redirectTo: string = "/auth/login") {
  const user = await getCurrentUser();
  if (!user) {
    redirect(redirectTo);
  }
  return user;
}
