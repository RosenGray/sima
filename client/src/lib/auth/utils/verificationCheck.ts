import { getCurrentUser } from "./auth.utils";

export class EmailNotVerifiedError extends Error {
  constructor(message: string = "Email не подтвержден. Пожалуйста, проверьте вашу почту.") {
    super(message);
    this.name = "EmailNotVerifiedError";
  }
}

/**
 * Utility function to check if the current user has verified their email.
 * Throws an EmailNotVerifiedError if the user is not verified.
 * Use this in sensitive operations like password changes, payments, etc.
 */
export async function requireEmailVerification(): Promise<void> {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Пользователь не аутентифицирован");
  }
  
  if (!user.isEmailVerified) {
    throw new EmailNotVerifiedError();
  }
}

/**
 * Checks if the current user has verified their email without throwing an error.
 * Returns true if verified, false otherwise.
 */
export async function isEmailVerified(): Promise<boolean> {
  const user = await getCurrentUser();
  return user ? user.isEmailVerified : false;
}

