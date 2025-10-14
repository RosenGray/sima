import { cookies } from "next/headers";
import { SIMA_AUTH_SESSION_CONFIG } from "../config";
import { IUser, User } from "../models/User";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";


export const jwtSignUser = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: user.isEmailVerified ?? false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      hasPrivateProfessionalPage: user.hasPrivateProfessionalPage,
    },
    process.env.JWT_KEY!
  );
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
    return JSON.parse(JSON.stringify(user));
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


export const thisUserIsOwner = (userId: string, ownerId: string) => {
  return userId === ownerId;
}