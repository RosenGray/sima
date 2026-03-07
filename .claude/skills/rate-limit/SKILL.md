---
name: rate-limit
description: Applies per-user or per-resource rate limiting in server actions using the project's MongoDB-backed checkRateLimit. Use when adding or changing rate limits on publish flows, notifications, messaging, or any action that should be capped per key/window.
---

# Rate limiting (server actions)

## When to use

- **Publish / submit flows** (e.g. publish ad, create listing): limit per user per time window.
- **Notifications** (e.g. email per conversation): limit per conversation/recipient to avoid spam.
- **Messaging or other high-frequency actions**: cap calls per user or per resource.

Use the existing `checkRateLimit` helper from `@/lib/rateLimit/rateLimit`. No new infrastructure.

## API

```typescript
import { checkRateLimit } from "@/lib/rateLimit/rateLimit";

const { allowed, remaining } = await checkRateLimit({
  key: string,        // e.g. user.id or `conv_${id}_${email}`
  action: string,     // unique name per use case, e.g. "publish-professional-service"
  limit: number,      // max count in the window
  windowSeconds: number,
});
```

- **key**: Identifies the bucket (user, conversation+recipient, IP, etc.).
- **action**: Names the action type; each (key, action) has its own counter.
- **limit** / **windowSeconds**: Max `limit` occurrences in the last `windowSeconds` seconds.
- **Return**: `allowed` (boolean), `remaining` (number). If `!allowed`, do not perform the action and return a user-facing error.

## Placement in server actions

1. Resolve the user (or context) and validate input as needed.
2. Call `checkRateLimit` **before** doing heavy or side-effectful work (DB writes, uploads, emails).
3. If `!allowed`, return early with a clear message (e.g. `result.reply({ formErrors: ["…"] })` or equivalent).
4. Otherwise proceed; the helper already incremented the counter.

## Key and action naming

- **Per-user limits**: `key: user.id`, `action: "publish-professional-service"`, `"publish-car"`, etc.
- **Per-conversation/recipient**: `key: \`conv_${conversationPublicId}_${recipientEmail}\``, `action: "message_notification"`.
- Use kebab-case, unique action names per use case so limits don’t clash.

## Examples

**Publish action (per user, 10 per hour):**

```typescript
const user = await getCurrentUser();
if (!user) return result.reply({ formErrors: ["…"] });

const { allowed } = await checkRateLimit({
  key: user.id,
  action: "publish-professional-service",
  limit: 10,
  windowSeconds: 3600,
});
if (!allowed) {
  return result.reply({
    formErrors: ["Превышен лимит публикаций. Попробуйте позже через час"],
  });
}
// … rest of publish logic
```

**Notification (per conversation+recipient, 1 per 15 min):**

```typescript
const { allowed } = await checkRateLimit({
  key: `conv_${conversationPublicId}_${recipientEmail}`,
  action: "message_notification",
  limit: 1,
  windowSeconds: 900,
});
if (!allowed) return;
// … send email
```

## Implementation details (reference)

- **Storage**: MongoDB collection `rate_limits`; TTL index on `windowStart` for cleanup (~7 days).
- **Behavior**: Fixed window anchored to the first request; counter is per (key, action); window resets after `windowSeconds` seconds from the first hit. `checkRateLimit` increments on each allowed call — if the limit is already reached it returns early without incrementing.
- **Index**: Ensured once per process in `rateLimit.ts`; no extra setup required in app code.

## Adding a new rate-limited action

1. Choose a **key** (who/resource to limit) and **action** (unique string).
2. Choose **limit** and **windowSeconds**.
3. In the server action: after auth/validation, call `checkRateLimit`; if `!allowed`, return a clear error and stop.
4. Reuse the same (key, action) for all code paths that should share the same limit.
