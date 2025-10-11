import { randomBytes } from "crypto";
import { User } from "../../models/User";
import connectDB from "@/lib/mongo/mongodb";

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
export enum TokenValidationReason {
  TokenNotFound = 0,
  TokenExpired = 1,
  InvalidToken = 2,
}
type TokenValidationResult = {
  isValid: boolean;
  reason?: TokenValidationReason;
  email?: string;
};

export const validateToken = async (
  token: string
): Promise<TokenValidationResult> => {
  try {
    await connectDB();
    const user = await User.findOne({ resetToken: token });

    if (!user || !user.resetTokenExpiresAt) {
      return { isValid: false, reason: TokenValidationReason.TokenNotFound };
    }

    if (Date.now() > user.resetTokenExpiresAt.getTime()) {
      await deleteToken(token);
      return { isValid: false, reason: TokenValidationReason.TokenExpired };
    }
    return { isValid: true, email: user.email };
  } catch (error) {
    console.log(error);
    return { isValid: false, reason: TokenValidationReason.TokenNotFound };
  }
};

export const deleteToken = async (token: string) => {
  await User.updateOne(
    { resetToken: token },
    { $unset: { resetToken: "", resetTokenExpiresAt: "" } }
  );
};
