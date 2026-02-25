---
name: sima-ad-status
description: Add a status field (active | expired | archived | deleted | pending) to an ad/entity model, set new ads to "active" on create, and add status filtering to getAll and getByPublicId (default "active"). Use when adding status lifecycle to a new or existing section (e.g. cars, pets, professional-service).
---

# Ad Status Field Implementation

## When to Use This Skill

- Adding a `status` field to an ad/entity model so ads can be active, expired, archived, deleted, or pending.
- Ensuring newly created ads start as `"active"`.
- Filtering listing and detail by status: always apply a status filter, defaulting to `"active"` when omitted. Callers can pass a specific status (e.g. `"archived"`) to list or fetch by that status.
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

## Step 5: Repository – status in getAll

Status is always applied to the query; default to `"active"` when omitted.

1. Add optional `status` to the search filters interface:

```typescript
export interface EntitySearchFilters {
  // ... existing filters
  /** Omit or undefined = "active". Pass a specific status to filter by that status. */
  status?: EntityStatus;
}
```

2. When building the search filter in `getAll`:

- `status` is always set: `sanitizedFilters.status ?? "active"`.

```typescript
const searchFilter: FilterQuery<typeof Entity> = {};

searchFilter.status = sanitizedFilters.status ?? "active";
```

Public listing and lobby call `getAll(filters)` without `status` and get the default `"active"`. A "my ads" or admin view can pass `status: "archived"` (or another value) to filter by that status.

## Step 6: Repository – status in getByPublicId

Status is always applied to the query; default to `"active"` when omitted.

1. Extend the signature:

```typescript
async getByPublicId(
  publicId: string,
  options?: { status?: EntityStatus },
): Promise<SerializedEntity | null>
```

2. Semantics:

- `options?.status === undefined` or not passed → default `"active"` (public detail page).
- `options?.status === "archived"` (or other value) → filter by that status.

```typescript
const query: FilterQuery<typeof Entity> = { publicId };

query.status = options?.status ?? "active";
const entity = await Entity.findOne(query)...
```

3. Call sites:

- **Public detail page**: `getByPublicId(id)` → active only.
- **Edit action**: Call `getByPublicId(id)` (default active). If the app allows editing only active ads, this is sufficient. If edit must load archived/expired ads, the flow must pass the known status (e.g. from a prior list) or use a separate repository method that does not filter by status (not covered in this skill).
- **Chat / other**: `getByPublicId(id)` for active-only when that is correct.

## Optional: migration for existing data

If the collection already has documents without `status`:

- Run a one-time update to set `status: "active"` where `status` is missing (e.g. MongoDB `updateMany({ status: { $exists: false } }, { $set: { status: "active" } })`). Otherwise, any repository filter by `status: "active"` would exclude those documents.

## Checklist

- [ ] Exported `ENTITY_STATUSES` (or section-specific name) and `EntityStatus` type in the model file.
- [ ] Added `status: EntityStatus` to the entity interface.
- [ ] Added `status` to the Mongoose schema with `enum`, `default: "active"`, `required: true`, and `index: true`.
- [ ] In the publish action, set `status: "active"` when creating the new document.
- [ ] Did **not** add `status` to the create form schema (server-set only).
- [ ] In repository: added optional `status?: EntityStatus` to search filters; in `getAll`, always set `searchFilter.status = sanitizedFilters.status ?? "active"`.
- [ ] In repository: `getByPublicId(publicId, options?: { status?: EntityStatus })`; always set `query.status = options?.status ?? "active"`; edit action uses default (active) or passes known status / separate API if non-active edit is required.
- [ ] If the section already had documents, planned or ran a migration to set `status: "active"` where missing.

## Reference

- Model: [client/src/lib/professionals/professional-service/models/ProfessionalService.ts](client/src/lib/professionals/professional-service/models/ProfessionalService.ts) (interface, constant, schema).
- Publish: [client/src/lib/professionals/professional-service/actions/publishProfessionalServiceAd.ts](client/src/lib/professionals/professional-service/actions/publishProfessionalServiceAd.ts) (`status: "active"` in `new ProfessionalService({ ... })`).
- Repository: [client/src/lib/professionals/professional-service/repository/ProfessionalServiceRepository.ts](client/src/lib/professionals/professional-service/repository/ProfessionalServiceRepository.ts) (status in `getAll` and `getByPublicId`, default `"active"`).
- Edit action: [client/src/lib/professionals/professional-service/actions/editProfessionalServiceAd.ts](client/src/lib/professionals/professional-service/actions/editProfessionalServiceAd.ts) (calls `getByPublicId(id)`; update to match repository API if edit must support non-active ads).
