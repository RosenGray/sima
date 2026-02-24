---
name: sima-ad-status
description: Add a status field (active | expired | archived | deleted | pending) to an ad/entity model, set new ads to "active" on create, and add configurable status filtering to getAll and getByPublicId (default "active", optional null for "any"). Use when adding status lifecycle to a new or existing section (e.g. cars, pets, professional-service).
---

# Ad Status Field Implementation

## When to Use This Skill

- Adding a `status` field to an ad/entity model so ads can be active, expired, archived, deleted, or pending.
- Ensuring newly created ads start as `"active"`.
- Filtering listing and detail by status with a **configurable** default (no hardcoded `"active"` only): callers can request a specific status, default to active, or pass `null` to skip status filter (e.g. edit page loading any status).
- Reusing the same pattern across sections (vehicles, pets, professional-service, etc.).

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

## Step 5: Repository – configurable status in getAll

Do **not** hardcode `status: "active"`. Make status a **parameter** so callers can list active (default), archived, or all statuses.

1. Add optional `status` to the search filters interface:

```typescript
export interface EntitySearchFilters {
  // ... existing filters
  /** Omit or undefined = "active". Pass null to skip status filter (all statuses). */
  status?: EntityStatus | null;
}
```

2. When building the search filter in `getAll`:

- If `status === null` → do **not** add `status` to the query (return all statuses).
- If `status === undefined` or not passed → default to `"active"`.
- If `status` is a value (e.g. `"archived"`) → set `searchFilter.status = status`.

```typescript
const searchFilter: FilterQuery<typeof Entity> = {};
if (sanitizedFilters.status === null) {
  // No status filter
} else {
  searchFilter.status = sanitizedFilters.status ?? ("active" as EntityStatus);
}
```

Public listing and lobby typically call `getAll(filters)` without `status`, so they get the default `"active"`. A "my ads" or admin view can pass `status: "archived"` or `status: null`.

## Step 6: Repository – configurable status in getByPublicId

Do **not** hardcode `status: "active"`. Add an optional second parameter so callers can get by id for a specific status or **any** status (e.g. edit page).

1. Extend the signature:

```typescript
async getByPublicId(
  publicId: string,
  options?: { status?: EntityStatus | null }
): Promise<SerializedEntity | null>
```

2. Semantics:

- `options?.status === undefined` or not passed → default `"active"` (public detail page).
- `options?.status === null` → do **not** add status to the query (return the ad regardless of status, e.g. for edit page).
- `options?.status === "archived"` (or other value) → filter by that status.

```typescript
const query: FilterQuery<typeof Entity> = { publicId };
if (options?.status !== null) {
  query.status = options?.status ?? ("active" as EntityStatus);
}
const entity = await Entity.findOne(query)...
```

3. Call sites:

- **Public detail page**: `getByPublicId(id)` → active only.
- **Edit action** (owner must load ad even if archived/expired): `getByPublicId(id, { status: null })`.
- **Chat / other**: keep default `getByPublicId(id)` for active-only when that is correct.

## Optional: migration for existing data

If the collection already has documents without `status`:

- Run a one-time update to set `status: "active"` where `status` is missing (e.g. MongoDB `updateMany({ status: { $exists: false } }, { $set: { status: "active" } })`). Otherwise, any repository filter by `status: "active"` would exclude those documents.

## Checklist

- [ ] Exported `ENTITY_STATUSES` (or section-specific name) and `EntityStatus` type in the model file.
- [ ] Added `status: EntityStatus` to the entity interface.
- [ ] Added `status` to the Mongoose schema with `enum`, `default: "active"`, `required: true`, and `index: true`.
- [ ] In the publish action, set `status: "active"` when creating the new document.
- [ ] Did **not** add `status` to the create form schema (server-set only).
- [ ] In repository: added optional `status?: EntityStatus | null` to search filters; in `getAll`, default to `"active"` when undefined, skip filter when `null`.
- [ ] In repository: `getByPublicId(publicId, options?: { status?: EntityStatus | null })`; default `"active"`, `null` = any status; edit action calls with `{ status: null }`.
- [ ] If the section already had documents, planned or ran a migration to set `status: "active"` where missing.

## Reference

- Model: [client/src/lib/professionals/professional-service/models/ProfessionalService.ts](client/src/lib/professionals/professional-service/models/ProfessionalService.ts) (interface, constant, schema).
- Publish: [client/src/lib/professionals/professional-service/actions/publishProfessionalServiceAd.ts](client/src/lib/professionals/professional-service/actions/publishProfessionalServiceAd.ts) (`status: "active"` in `new ProfessionalService({ ... })`).
- Repository: [client/src/lib/professionals/professional-service/repository/ProfessionalServiceRepository.ts](client/src/lib/professionals/professional-service/repository/ProfessionalServiceRepository.ts) (configurable status in `getAll` and `getByPublicId`).
- Edit action: [client/src/lib/professionals/professional-service/actions/editProfessionalServiceAd.ts](client/src/lib/professionals/professional-service/actions/editProfessionalServiceAd.ts) (`getByPublicId(id, { status: null })`).
