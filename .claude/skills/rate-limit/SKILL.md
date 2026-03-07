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
import { RATE_LIMIT_ACTION_PUBLISH_HOUR, RateLimitAction } from "@/lib/constants/rateLimitActions";

const { allowed, remaining } = await checkRateLimit({
  key: string,              // e.g. user.id or `conv_${id}_${email}`
  action: RateLimitAction,  // must be a typed constant from rateLimitActions.ts
  limit: number,            // max count in the window
  windowSeconds: number,
});
```

- **key**: Identifies the bucket (user, conversation+recipient, IP, etc.).
- **action**: Must be a `RateLimitAction` constant from `@/lib/constants/rateLimitActions`. Never use a raw string.
- **limit** / **windowSeconds**: Max `limit` occurrences in the last `windowSeconds` seconds.
- **Return**: `allowed` (boolean), `remaining` (number). If `!allowed`, do not perform the action and return a user-facing error.

## Action constants

All valid action strings live in `client/src/lib/constants/rateLimitActions.ts`:

```typescript
RATE_LIMIT_ACTION_PUBLISH_HOUR        // "publish-ad-hour"   — shared hourly publish budget
RATE_LIMIT_ACTION_PUBLISH_DAY         // "publish-ad-day"    — shared daily publish budget
RATE_LIMIT_ACTION_MESSAGE_NOTIFICATION // "message-notification"
```

Limits for the free tier are centralised in `PUBLISH_LIMITS`:

```typescript
import { PUBLISH_LIMITS } from "@/lib/constants/rateLimitActions";
// PUBLISH_LIMITS.free.hour  → 5
// PUBLISH_LIMITS.free.day   → 15
```

To add a new action, add a constant + union member in `rateLimitActions.ts` — never pass a raw string to `checkRateLimit`.

## Placement in server actions

1. Resolve the user (or context) and validate input as needed.
2. Call `checkRateLimit` **before** doing heavy or side-effectful work (DB writes, uploads, emails).
3. If `!allowed`, return early with a clear message (e.g. `result.reply({ formErrors: ["…"] })` or equivalent).
4. Otherwise proceed; the helper already incremented the counter.

## Key and action naming

- **Per-user publish limits**: `key: user.id`, action is one of the two shared constants (`RATE_LIMIT_ACTION_PUBLISH_HOUR` / `RATE_LIMIT_ACTION_PUBLISH_DAY`). All entity types share the same hourly and daily budgets — do not create per-entity action strings.
- **Per-conversation/recipient**: `key: \`conv_${conversationPublicId}_${recipientEmail}\``, `action: RATE_LIMIT_ACTION_MESSAGE_NOTIFICATION`.

## Examples

**Publish action (dual-window: 5/hr + 15/day, shared across all entity types):**

```typescript
import { checkRateLimit } from "@/lib/rateLimit/rateLimit";
import {
  RATE_LIMIT_ACTION_PUBLISH_HOUR,
  RATE_LIMIT_ACTION_PUBLISH_DAY,
  PUBLISH_LIMITS,
} from "@/lib/constants/rateLimitActions";

const user = await getCurrentUser();
if (!user) return result.reply({ formErrors: ["…"] });

const [hourly, daily] = await Promise.all([
  checkRateLimit({
    key: user.id,
    action: RATE_LIMIT_ACTION_PUBLISH_HOUR,
    limit: PUBLISH_LIMITS.free.hour,
    windowSeconds: 3600,
  }),
  checkRateLimit({
    key: user.id,
    action: RATE_LIMIT_ACTION_PUBLISH_DAY,
    limit: PUBLISH_LIMITS.free.day,
    windowSeconds: 86400,
  }),
]);
if (!hourly.allowed || !daily.allowed) {
  return result.reply({
    formErrors: ["Превышен лимит публикаций. Попробуйте позже через час"],
  });
}
// … rest of publish logic
```

**Notification (per conversation+recipient, 1 per 15 min):**

```typescript
import { RATE_LIMIT_ACTION_MESSAGE_NOTIFICATION } from "@/lib/constants/rateLimitActions";

const { allowed } = await checkRateLimit({
  key: `conv_${conversationPublicId}_${recipientEmail}`,
  action: RATE_LIMIT_ACTION_MESSAGE_NOTIFICATION,
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

1. Add a new constant and union member to `client/src/lib/constants/rateLimitActions.ts`.
2. Choose a **key** (who/resource to limit), **limit**, and **windowSeconds**.
3. In the server action: after auth/validation, call `checkRateLimit` with the typed constant; if `!allowed`, return a clear error and stop.
4. Reuse the same (key, action) for all code paths that should share the same limit.

**For new publish flows**: do NOT create a new action constant. Use the existing `RATE_LIMIT_ACTION_PUBLISH_HOUR` + `RATE_LIMIT_ACTION_PUBLISH_DAY` pair with `PUBLISH_LIMITS.free.*` — the budget is shared across all entity types by design.
