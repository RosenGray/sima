// Shared types for email verification
// This file doesn't have "use server" so it can export enums and types

export enum VerificationTokenValidationReason {
  TokenNotFound = 0,
  TokenExpired = 1,
  AlreadyVerified = 2,
}

export type VerifyEmailResult = {
  success: boolean;
  message: string;
  reason?: VerificationTokenValidationReason;
};

export type ResendVerificationResult = {
  success: boolean;
  message: string;
};

