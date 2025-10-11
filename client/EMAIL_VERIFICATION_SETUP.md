# Email Verification System - Setup Guide

## Overview

This email verification system implements a progressive verification approach where users can register and login immediately, but are encouraged to verify their email through:

- Verification email sent immediately upon registration
- Persistent banner reminder for unverified users
- Warning emails before account deletion
- Automatic cleanup of unverified accounts after 21 days

## Features Implemented

### 1. User Registration Flow
- ✅ User registers with email/password
- ✅ Account is created and user is logged in immediately
- ✅ Verification email sent automatically
- ✅ User can use the app while unverified

### 2. Email Verification
- ✅ Unique token sent to user's email (15-minute expiration)
- ✅ Click verification link to verify email
- ✅ Option to resend verification if token expired
- ✅ Works even if user is not logged in

### 3. Verification Reminders
- ✅ Banner shown to unverified users across the app
- ✅ Dismissible (per session)
- ✅ "Resend verification email" button

### 4. Account Cleanup System
- ✅ Warning emails sent at days 14, 18, and 20
- ✅ Accounts deleted after 21 days if not verified
- ✅ Fresh verification link included in warning emails
- ✅ Final notification email after deletion

## Files Created/Modified

### New Files
```
client/src/lib/auth/services/EmailVerificationManager.ts
client/src/lib/auth/services/AccountCleanupService.ts
client/src/lib/auth/actions/verifyEmail.ts
client/src/lib/auth/actions/resendVerificationEmail.ts
client/src/lib/auth/utils/verificationCheck.ts
client/src/app/auth/verify-email/[token]/page.tsx
client/src/components/EmailVerificationBanner/EmailVerificationBanner.tsx
client/src/components/EmailVerificationBanner/EmailVerificationBanner.styles.ts
client/src/app/api/cron/cleanup-accounts/route.ts
```

### Modified Files
```
client/src/lib/auth/models/User.ts - Added verification fields
client/src/lib/auth/actions/register.ts - Added verification email sending
client/src/app/layout.tsx - Added verification banner
```

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Client URL for verification links
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000  # or your production URL

# Cron job secret for account cleanup
CRON_SECRET=your-secure-random-secret-here
```

**Important:** Generate a strong secret for `CRON_SECRET`. You can use:
```bash
openssl rand -base64 32
```

## Setting Up the Cron Job

The account cleanup needs to run daily. You have several options:

### Option 1: Vercel Cron (Recommended for Vercel deployments)

1. Create a `vercel.json` in your project root (or add to existing):

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup-accounts",
      "schedule": "0 2 * * *"
    }
  ]
}
```

This runs daily at 2 AM UTC.

2. Add your `CRON_SECRET` to Vercel environment variables in the dashboard

### Option 2: External Cron Service (cron-job.org, EasyCron, etc.)

1. Sign up for a cron service
2. Create a new cron job with these settings:
   - URL: `https://yourdomain.com/api/cron/cleanup-accounts`
   - Method: `POST`
   - Schedule: `0 2 * * *` (daily at 2 AM)
   - Headers: `Authorization: Bearer YOUR_CRON_SECRET`

### Option 3: Server Cron (if self-hosting)

Add to your crontab:
```bash
0 2 * * * curl -X POST -H "Authorization: Bearer YOUR_CRON_SECRET" https://yourdomain.com/api/cron/cleanup-accounts
```

## Testing

### Test Email Verification Flow

1. Register a new user
2. Check email inbox for verification email
3. Click verification link
4. Confirm email is verified

### Test Resend Functionality

1. Register a new user
2. Wait 15 minutes for token to expire
3. Click verification link (should show error)
4. Enter email to resend verification
5. Check inbox for new verification email

### Test Banner

1. Register and login as unverified user
2. Navigate around the app - banner should appear
3. Click "Dismiss" - banner should hide for session
4. Click "Resend" - should send new verification email

### Test Cron Job Manually

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/cron/cleanup-accounts
```

Expected response:
```json
{
  "success": true,
  "message": "Account cleanup completed successfully",
  "result": {
    "warningsSent": 0,
    "accountsDeleted": 0,
    "errors": 0,
    "executionTime": "123ms"
  }
}
```

## Configuration

### Adjust Cleanup Timing

Edit `client/src/lib/auth/services/AccountCleanupService.ts`:

```typescript
// Delete after 21 days (default)
export const UNVERIFIED_ACCOUNT_DELETION_DAYS = 21;

// Send warnings at these days
export const DELETION_WARNING_DAYS = [14, 18, 20];
```

### Adjust Token Expiration

Edit `client/src/lib/auth/services/EmailVerificationManager.ts`:

```typescript
// Tokens expire after 15 minutes (default)
export const TOKEN_EXPIRATION_MINUTES = 15;
```

## Using Email Verification Check in Your Code

For sensitive operations, require email verification:

```typescript
import { requireEmailVerification } from "@/lib/auth/utils/verificationCheck";

export async function sensitiveAction() {
  // This will throw an error if user is not verified
  await requireEmailVerification();
  
  // Your sensitive logic here...
}
```

Or check verification status without throwing:

```typescript
import { isEmailVerified } from "@/lib/auth/utils/verificationCheck";

export async function someAction() {
  const verified = await isEmailVerified();
  
  if (!verified) {
    // Show warning or limit functionality
  }
}
```

## Email Templates

All email templates are in Russian and match your existing password reset template styling:

- Verification email: Welcome + verify button
- Warning emails: Days left countdown + verify button
- Deletion email: Account deleted notification

Templates use the Sima logo from your Backblaze bucket.

## Monitoring

Check your server logs for:
- Verification emails sent/failed
- Cron job execution results
- Account deletions

Search for:
- `"Verification email sent:"`
- `"Deleted unverified account:"`
- `"Sent warning email to"`
- `"Account cleanup completed:"`

## Troubleshooting

### Verification emails not sending

1. Check Gmail credentials in `PasswordManager.ts`
2. Check NEXT_PUBLIC_CLIENT_URL is set correctly
3. Check server logs for email errors

### Banner not showing

1. Ensure user is logged in and unverified
2. Check session storage - clear if needed
3. Verify banner import in `layout.tsx`

### Cron job not working

1. Verify CRON_SECRET matches in both places
2. Check cron job is scheduled correctly
3. Test manually with curl command
4. Check authorization header format

### Token expired immediately

1. Check server timezone settings
2. Verify TOKEN_EXPIRATION_MINUTES value
3. Check Date.now() vs token creation time

## Security Notes

- Tokens are single-use and deleted after verification
- Tokens expire in 15 minutes
- CRON_SECRET protects cleanup endpoint
- Email existence not revealed in resend flow
- All verification logic runs server-side

## Future Enhancements

Consider adding:
- Rate limiting for resend emails (prevent abuse)
- Verification status in user profile page
- Admin dashboard for unverified account metrics
- Different expiration times for different scenarios
- Email verification required for specific features

## Support

If you encounter issues, check:
1. Server logs for errors
2. Email spam folder
3. Environment variables are set
4. Database connection is working
5. MongoDB User collection has new fields

