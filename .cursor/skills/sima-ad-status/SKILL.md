---
name: sima-ad-status
description: Add a status field (active | expired | archived | deleted | pending) to an ad/entity model and set new ads to "active" on create. Use when adding status lifecycle to a new or existing section (e.g. cars, pets, professional-service). Does not include repository filtering (getAll/getByPublicId); add that separately if needed.
---

# Ad Status Field Implementation

## When to Use This Skill

- Adding a `status` field to an ad/entity model so ads can be active, expired, archived, deleted, or pending.
- Ensuring newly created ads start as `"active"`.
- Reusing the same pattern across sections (vehicles, pets, professional-service, etc.).

This skill covers **model + publish action only**. It does **not** add status filtering to repository `getAll` or `getByPublicId`; implement that in the repository when you want listing/detail to show only active ads.

## Status Values

- **active** – Ad is live and visible (when you add repository filtering).
- **expired** – Ad has expired (e.g. by time or rule).
- **archived** – Ad was archived by the owner.
- **deleted** – Reserved for soft delete (optional); hard delete can remain as-is.
- **pending** – Ad is awaiting moderation or approval.

## Step 1: Model – constant and type

In the entity model file (e.g. `client/src/lib/{category}/{entity}/models/{Entity}.ts`):

1. Define and export the status constant and type:

```typescript
export const ENTITY_STATUSES = [
  "active",
  "expired",
  "archived",
  "deleted",
  "pending",
] as const;

export type EntityStatus = (typeof ENTITY_STATUSES)[number];
```

Use a section-specific name (e.g. `CAR_STATUSES` / `CarStatus`, `PET_FOR_SALE_STATUSES` / `PetForSaleStatus`, `PROFESSIONAL_SERVICE_STATUSES` / `ProfessionalServiceStatus`).

## Step 2: Model – interface

Add `status` to the entity interface (e.g. `ICar`, `IProfessionalService`):

```typescript
export interface IEntity {
  // ... existing fields
  status: EntityStatus;
  // ...
}
```

## Step 3: Model – Mongoose schema

In the same file, add a `status` field to the schema:

```typescript
status: {
  type: String,
  enum: ENTITY_STATUSES,
  default: "active",
  required: true,
  index: true,
},
```

Place it with other required/core fields (e.g. after refs like `user`, `category`). `index: true` helps if you later filter by status in the repository.

## Step 4: Publish action – set status on create

In the publish/create server action (e.g. `publishCarAd`, `publishProfessionalServiceAd`):

When creating the new document, set **`status: "active"`** explicitly:

```typescript
const entity = new Entity({
  ...result.value,
  user: user.id,
  publicId: nanoid(10),
  status: "active",
  // ... rest (acceptTerms, images, etc.)
});
await entity.save();
```

Do **not** add `status` to the create form schema; it is server-set only.

## Types / serialized shape

- The serialized type (e.g. `SerializedCar`, `SerilizeProfessionalService`) usually extends the entity interface. Once `status` is on the interface, it will appear in serialized responses; no extra type change is needed unless you explicitly omit it.

## Optional: repository filtering (not in this skill)

If you want only **active** ads on listing and detail:

- In **getAll**: when building the search filter, set `searchFilter.status = "active"`.
- In **getByPublicId**: add `status: "active"` to the `findOne` query so non-active ads return 404.

Implement that in the repository when needed; this skill does not prescribe it.

## Optional: migration for existing data

If the collection already has documents without `status`:

- Run a one-time update to set `status: "active"` where `status` is missing (e.g. MongoDB `updateMany({ status: { $exists: false } }, { $set: { status: "active" } })`). Otherwise, any repository filter by `status: "active"` would exclude those documents.

## Checklist

- [ ] Exported `ENTITY_STATUSES` (or section-specific name) and `EntityStatus` type in the model file.
- [ ] Added `status: EntityStatus` to the entity interface.
- [ ] Added `status` to the Mongoose schema with `enum`, `default: "active"`, `required: true`, and `index: true`.
- [ ] In the publish action, set `status: "active"` when creating the new document.
- [ ] Did **not** add `status` to the create form schema (server-set only).
- [ ] If the section already had documents, planned or ran a migration to set `status: "active"` where missing (if you use status in repository filters).

## Reference

- Example: [client/src/lib/professionals/professional-service/models/ProfessionalService.ts](client/src/lib/professionals/professional-service/models/ProfessionalService.ts) (interface, constant, schema).
- Publish: [client/src/lib/professionals/professional-service/actions/publishProfessionalServiceAd.ts](client/src/lib/professionals/professional-service/actions/publishProfessionalServiceAd.ts) (`status: "active"` in `new ProfessionalService({ ... })`).
