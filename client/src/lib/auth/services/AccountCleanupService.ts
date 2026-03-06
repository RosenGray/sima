import { User } from "../models/User";
import connectDB from "@/lib/mongo/mongodb";
import { generateToken, storeVerificationToken } from "./TokenManager/TokenManager";
import { EmailService } from "@/lib/common/services/EmailService";

// Configuration - PRODUCTION MODE
export const UNVERIFIED_ACCOUNT_DELETION_DAYS = 21;
export const DELETION_WARNING_DAYS = [14, 18, 20];

interface CleanupResult {
  warningsSent: number;
  accountsDeleted: number;
  errors: number;
}

export const processAccountCleanup = async (): Promise<CleanupResult> => {
  try {
    await connectDB();

    const now = new Date();
    let warningsSent = 0;
    let accountsDeleted = 0;
    let errors = 0;

    // Find all unverified accounts
    const unverifiedUsers = await User.find({
      isEmailVerified: false,
      createdAt: { $exists: true },
    });

    for (const user of unverifiedUsers) {
      try {
        const createdAt = user.createdAt as Date;
        const daysSinceCreation = Math.floor(
          (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Delete account if it's been more than UNVERIFIED_ACCOUNT_DELETION_DAYS
        if (daysSinceCreation >= UNVERIFIED_ACCOUNT_DELETION_DAYS) {
          await User.deleteOne({ _id: user._id });
          await EmailService.sendAccountDeletionEmail(user.email);
          accountsDeleted++;
          console.log(`Deleted unverified account: ${user.email}`);
          continue;
        }

        // Send warning emails at specific intervals
        for (const warningDay of DELETION_WARNING_DAYS) {
          if (daysSinceCreation === warningDay) {
            const daysLeft =
              UNVERIFIED_ACCOUNT_DELETION_DAYS - daysSinceCreation;

            // Generate fresh verification token
            const verificationToken = generateToken();
            await storeVerificationToken(user.email, verificationToken);

            const { NEXT_PUBLIC_CLIENT_URL } = process.env;
            const verificationLink = `${NEXT_PUBLIC_CLIENT_URL}/auth/verify-email/${verificationToken}`;

            await EmailService.sendDeletionWarningEmail(
              user.email,
              daysLeft,
              verificationLink
            );
            warningsSent++;
            console.log(
              `Sent warning email to ${user.email}, ${daysLeft} days left`
            );
            break;
          }
        }
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        errors++;
      }
    }

    return {
      warningsSent,
      accountsDeleted,
      errors,
    };
  } catch (error) {
    console.error("Error in processAccountCleanup:", error);
    throw error;
  }
};
