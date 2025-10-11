# Quick Start - Testing Email Verification Locally

## Prerequisites

- Node.js installed
- MongoDB running
- Gmail credentials configured in `PasswordManager.ts`

## Step 1: Set Environment Variables

Create or update your `.env.local` file:

```bash
# Required for verification links
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000

# Required for cron endpoint (use any random string for testing)
CRON_SECRET=test-secret-local-only-change-in-production

# Your other existing environment variables...
```

## Step 2: Start the Development Server

```bash
cd client
npm install  # or pnpm install
npm run dev
```

The app should start at `http://localhost:3000`

## Step 3: Test Registration & Verification

### A. Register a New User

1. Go to `http://localhost:3000/auth/register`
2. Fill in the registration form
3. Submit

**Expected behavior:**
- ✅ User is created and logged in immediately
- ✅ Redirected to success page
- ✅ Check terminal logs for: `"Verification email sent:"`
- ✅ Check email inbox for verification email

### B. Check Verification Banner

1. After registration, navigate to home page
2. **Expected:** Banner appears at top of page
3. Click "Dismiss" → banner hides
4. Refresh page → banner shows again (new session)

### C. Verify Email

**Option 1 - Token is valid:**
1. Open verification email
2. Click "Подтвердить электронную почту" button
3. **Expected:** Success page appears
4. Auto-redirects to home after 3 seconds
5. **Banner should no longer appear**

**Option 2 - Token is expired (wait 15 minutes):**
1. Wait 15+ minutes after registration
2. Click verification link
3. **Expected:** Error page with email input form
4. Enter your email
5. Click "Отправить"
6. **Expected:** "Новое письмо отправлено!" message
7. Check inbox for new verification email
8. Click new link → should verify successfully

### D. Test Resend from Banner

1. Register a new user (or use unverified account)
2. Click "Отправить заново" in banner
3. **Expected:** Success message appears
4. Check email inbox for new verification
5. Click link to verify

## Step 4: Test Cron Job Manually

### Using curl:

```bash
curl -X POST \
  -H "Authorization: Bearer test-secret-local-only-change-in-production" \
  http://localhost:3000/api/cron/cleanup-accounts
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Account cleanup completed successfully",
  "result": {
    "warningsSent": 0,
    "accountsDeleted": 0,
    "errors": 0,
    "executionTime": "50ms"
  }
}
```

### Using browser/Postman:

1. POST to `http://localhost:3000/api/cron/cleanup-accounts`
2. Add header: `Authorization: Bearer test-secret-local-only-change-in-production`
3. Submit

### Test with old account:

To test the cleanup functionality without waiting 21 days:

1. Open MongoDB Compass or use mongo shell
2. Find a test user
3. Manually update their `createdAt` date to 22 days ago:

```javascript
db.users.updateOne(
  { email: "test@example.com" },
  { 
    $set: { 
      createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
      isEmailVerified: false 
    } 
  }
)
```

4. Run the cron job curl command
5. **Expected:** Account deleted, deletion email sent
6. Check `accountsDeleted: 1` in response

## Step 5: Check Database

Use MongoDB Compass or mongo shell to verify:

### Check User Model Fields

```javascript
db.users.findOne({ email: "your-test-email@example.com" })
```

**Should see:**
```javascript
{
  _id: ObjectId("..."),
  firstName: "...",
  lastName: "...",
  email: "...",
  password: "...",
  emailVerificationToken: "...", // or undefined if verified
  emailVerificationTokenExpiresAt: ISODate("..."), // or undefined
  isEmailVerified: false, // or true after verification
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

### Query for Unverified Users

```javascript
db.users.find({ isEmailVerified: false })
```

### Query for Old Unverified Users (for cleanup testing)

```javascript
const cutoffDate = new Date(Date.now() - 21 * 24 * 60 * 60 * 1000);
db.users.find({ 
  isEmailVerified: false,
  createdAt: { $lt: cutoffDate }
})
```

## Step 6: Check Server Logs

Look for these log messages in your terminal:

### Registration:
```
Verification email sent: <messageId>
```

### Verification:
```
Email successfully verified for: user@example.com
```

### Resend:
```
Verification email sent: <messageId>
```

### Cron Job:
```
Starting account cleanup process...
Sent warning email to user@example.com, 7 days left
Deleted unverified account: user@example.com
Account cleanup completed: { warningsSent: 1, accountsDeleted: 1, errors: 0, executionTime: '150ms' }
```

## Common Issues & Solutions

### Issue: Verification email not received

**Check:**
1. Server logs for email errors
2. Email spam folder
3. Gmail credentials in `PasswordManager.ts`
4. Internet connection

**Solution:**
```bash
# Check logs for errors
# Verify GMAIL_APP_USER and GMAIL_APP_PASSWORD are correct
```

### Issue: Banner not showing

**Check:**
1. User is logged in
2. User's `isEmailVerified` is `false`
3. Banner wasn't dismissed (clear sessionStorage)

**Solution:**
```javascript
// In browser console:
sessionStorage.clear()
// Refresh page
```

### Issue: Token expired immediately

**Check:**
1. Server timezone
2. TOKEN_EXPIRATION_MINUTES value

**Solution:**
```typescript
// In EmailVerificationManager.ts
export const TOKEN_EXPIRATION_MINUTES = 60; // Increase for testing
```

### Issue: Cron job returns 401 Unauthorized

**Check:**
1. CRON_SECRET in `.env.local` matches header
2. Header format: `Authorization: Bearer YOUR_SECRET`

**Solution:**
```bash
# Print your env var to verify
echo $CRON_SECRET

# Or check in code
console.log(process.env.CRON_SECRET)
```

### Issue: Verification page shows error but token is valid

**Check:**
1. Database connection
2. Token in database matches URL token
3. Token expiration date

**Solution:**
```javascript
// Check in MongoDB
db.users.findOne({ emailVerificationToken: "YOUR_TOKEN_HERE" })
```

## Testing Checklist

Use this checklist to ensure everything works:

- [ ] User can register successfully
- [ ] Verification email is received
- [ ] Email has correct verification link
- [ ] User is logged in after registration
- [ ] Banner appears for unverified users
- [ ] Banner can be dismissed
- [ ] Banner "Resend" button works
- [ ] Clicking verification link verifies email
- [ ] Banner disappears after verification
- [ ] Expired token shows resend form
- [ ] Resend form sends new email
- [ ] New verification link works
- [ ] Cron endpoint requires authorization
- [ ] Cron endpoint processes accounts
- [ ] Warning emails are sent (if accounts old enough)
- [ ] Old accounts are deleted (if 21+ days)
- [ ] All emails have correct Russian text
- [ ] All emails have Sima logo
- [ ] Mobile layout works for banner
- [ ] No console errors in browser
- [ ] No linter errors in code

## Performance Testing

### Test email sending speed:
```bash
time curl -X POST ... # Should complete in < 2 seconds
```

### Test cron job performance:
```bash
# With 100 users in database:
# Should complete in < 5 seconds
```

### Test page load times:
- Verification page should load instantly
- Banner should not slow down page loads

## Ready for Production?

Before deploying, ensure:

- ✅ All checklist items pass
- ✅ No errors in logs
- ✅ Emails received and formatted correctly
- ✅ Banner appears/disappears correctly
- ✅ Cron job processes accounts
- ✅ Environment variables configured
- ✅ Gmail credentials secure
- ✅ CRON_SECRET is strong (not "test-secret-local-only")

## Need Help?

Check:
1. `EMAIL_VERIFICATION_SETUP.md` - Full setup guide
2. `IMPLEMENTATION_SUMMARY.md` - Complete implementation details
3. Server logs for detailed error messages
4. MongoDB for data verification

Happy testing! 🚀

