# Skill: Email on Ad Creation

Send a transactional confirmation email to the ad creator when they publish a new ad. Non-blocking, Russian language, to the creator only.

## When to Use

Use this skill when adding a "ad published" confirmation email to any new or existing ad section (cars, pets, for-free, professional-service, etc.).

## Architecture

```
Server Action (publishXxxAd.ts)
  └─ non-blocking async IIFE
       └─ EmailService.sendAdPublishedEmail(...)
            └─ getAdPublishedEmailHtml / getAdPublishedEmailText
                 └─ MailerSend API
```

## Step-by-Step Checklist

### 1. Template (reuse existing — no new file needed)

`src/lib/common/email/templates/adPublished.ts` already exists. It accepts:

```typescript
interface AdPublishedEmailParams {
  categoryName: string;  // Russian display name, e.g. "Сантехника"
  adLink: string;        // Full URL to the published ad
}
```

No changes needed for new sections — the template is generic.

### 2. EmailService method (already exists — no change needed)

`src/lib/common/services/EmailService.ts` already has:

```typescript
static async sendAdPublishedEmail(
  params: { recipientEmail: string; categoryName: string; adLink: string },
  retries?: number
): Promise<boolean>
```

No changes needed for new sections.

### 3. Wire into the server action

In the publish action file for the new section (e.g. `publishCarsAd.ts`):

**Add imports at the top:**
```typescript
import { ServiceCategory } from "@/lib/service-categories/models/ServiceCategory";
import { EmailService } from "@/lib/common/services/EmailService";
```

**Add after `revalidatePath(...)`, before `redirect(...)`:**
```typescript
// Non-blocking — never delays or fails the ad creation
(async () => {
  try {
    const category = await CategoryModel.findById(result.value.category).lean();
    const adLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/YOUR-SECTION/${createdAd.publicId}`;
    await EmailService.sendAdPublishedEmail({
      recipientEmail: result.value.email,
      categoryName: (category as { russianDisplayName?: string } | null)?.russianDisplayName ?? "Объявление",
      adLink,
    });
  } catch (emailError) {
    console.error("Error sending ad published email:", emailError);
  }
})();
```

**Adapt per section:**
- `CategoryModel` → the model for that section's category (or omit if no category)
- `/YOUR-SECTION/` → the URL path for the section
- `createdAd.publicId` → the `publicId` field on the saved document
- `result.value.email` → the email field from the form schema
- fallback string → a sensible Russian category name for the section

## Params to Adapt Per Section

| Param | Source | Notes |
|-------|--------|-------|
| `recipientEmail` | `result.value.email` | From the form submission |
| `categoryName` | `category.russianDisplayName` | Fetched lean inside the async block |
| `adLink` | `NEXT_PUBLIC_CLIENT_URL` + section path + `publicId` | Assembled in the async block |

## Pitfalls

- **Non-blocking**: always wrap in `(async () => { ... })()` — never `await` it in the action body.
- **Never fail the action**: catch all errors inside the async block and log with `console.error`.
- **Category name fallback**: always provide a Russian fallback string in case the category lookup returns null.
- **DB is already connected**: `connectDB()` is called earlier in the action, no need to call it again inside the async block.
- **`publicId`**: make sure the document is saved before reading `publicId` — it is set via `nanoid()` before `save()`.

## Reference Implementation

Professional service section:
- Template: `src/lib/common/email/templates/adPublished.ts`
- EmailService: `src/lib/common/services/EmailService.ts` → `sendAdPublishedEmail`
- Action: `src/lib/professionals/professional-service/actions/publishProfessionalServiceAd.ts`
