import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { User } from "../models/User";

// Configuration
export const TOKEN_EXPIRATION_MINUTES = 15;
export const TOKEN_LENGTH = 32;

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

type TokenValidationResult = {
  isValid: boolean;
  reason?: TokenValidationReason;
  email?: string;
};
export enum TokenValidationReason {
  TokenNotFound = 0,
  TokenExpired = 1,
  InvalidToken = 2,
}   
export const validateToken = async (
  token: string
): Promise<TokenValidationResult> => {
  const user = await User.findOne({ resetToken: token });

  if (!user || !user.resetTokenExpiresAt) {
    return { isValid: false, reason: TokenValidationReason.TokenNotFound };
  }

  if (Date.now() > user.resetTokenExpiresAt.getTime()) {
    await deleteToken(token);
    return { isValid: false, reason: TokenValidationReason.TokenExpired };
  }
  return { isValid: true, email: user.email };
};

export const deleteToken = async (token: string) => {
  await User.updateOne(
    { resetToken: token },
    { $unset: { resetToken: "", resetTokenExpiresAt: "" } }
  );
};
