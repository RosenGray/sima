import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { User } from "../models/User";

// Configuration
const TOKEN_EXPIRATION_MINUTES = 1;
const TOKEN_LENGTH = 32;

export const generateToken = () => {
  const buffer = randomBytes(TOKEN_LENGTH);
  return buffer.toString("hex");
};

export const storeToken = async (email: string, token: string) => {
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_MINUTES * 60 * 1000);
  await User.updateOne(
    { email },
    { $set: { resetToken: token, resetTokenExpiresAt: expiresAt } }
  );
};

export const validateToken = async (token: string) => {
  const tokenData = await User.findOne({ resetToken: token });

  if (!tokenData || !tokenData.resetTokenExpiresAt) {
    return { valid: false, reason: "Token not found" };
  }

  if (Date.now() > tokenData.resetTokenExpiresAt.getTime()) {
    await User.updateOne(
      { resetToken: token },
      { $unset: { resetToken: "", resetTokenExpiresAt: "" } }
    );
    return { valid: false, reason: "Token expired" };
  }
  return { valid: true, email: tokenData.email };
};

export const deleteToken = async (token:string) => {
    await User.updateOne(
        { resetToken: token },
        { $unset: { resetToken: "", resetTokenExpiresAt: "" } }
      );
  };