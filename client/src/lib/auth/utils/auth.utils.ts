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
      isEmailVerified: user.isEmailVerified ?? false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      hasPrivateProfessionalPage: user.hasPrivateProfessionalPage,
    },
    process.env.JWT_KEY!
  );
};

export async function getCurrentUser(): Promise<SerializedUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SIMA_AUTH_SESSION_CONFIG.name)?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
      email: string;
    };
    if (!decoded) return null;

    await connectDB();

    const now = new Date();
    const throttleMs = 5 * 60 * 1000; // 5 minutes

    type LeanUser = { _id: unknown; lastSeenAt?: Date | string; [k: string]: unknown };
    const found = (await User.findOne({ email: decoded.email }).lean()) as LeanUser | null;
    if (!found) return null;

    const lastSeenAt = found.lastSeenAt
      ? new Date(found.lastSeenAt)
      : null;
    const lastSeenAtMs = lastSeenAt ? lastSeenAt.getTime() : 0;
    const shouldUpdate =
      !lastSeenAt || now.getTime() - lastSeenAtMs > throttleMs;

    if (shouldUpdate) {
      await User.updateOne(
        { email: decoded.email },
        { $set: { lastSeenAt: now } }
      );
    }

    const userDoc = shouldUpdate
      ? ((await User.findOne({ email: decoded.email }).lean()) as LeanUser | null) ?? found
      : found;

    const serialized = JSON.parse(JSON.stringify(userDoc)) as SerializedUser;
    const docId = userDoc._id as { toString?: () => string } | undefined;
    serialized.id = docId?.toString?.() ?? "";
    if (userDoc.lastSeenAt) {
      serialized.lastSeenAt =
        typeof userDoc.lastSeenAt === "string"
          ? userDoc.lastSeenAt
          : new Date(userDoc.lastSeenAt).toISOString();
    }
    return serialized;
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


export const thisUserIsOwner = async ( ownerId: string) => {
  const user = await getCurrentUser();
  if (!user) return false;
  return user.id === ownerId;
}