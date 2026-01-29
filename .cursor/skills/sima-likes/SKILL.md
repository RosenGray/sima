---
name: sima-likes
description: Implements likes/favorites for ad sections (LikeButton on cards and detail, LikesProvider, server actions, guest merge). Use when adding favorites to a new section or wiring LikeButton into cards/detail.
---

# Likes / Favorites Implementation

## When to Use This Skill

- Adding a "like" or "favorites" feature to a new ad section (e.g. cars, professional-service).
- Placing `LikeButton` on listing cards and/or detail pages.
- Ensuring guest likes are stored in localStorage and merged on login.

The existing likes infrastructure (LikeButton, LikesProvider, AdLike model, server actions, repository, storage) is shared; for a new section you add an entity-type constant and wire the button in the right places with the correct `stopPropagation` behavior.

## Prerequisites

- Root layout already wraps the app with `LikesProvider` and passes `initialLikedIds` from `getLikedAdIdsByUser(user.id)` when the user is authenticated (see sima-likes rule).
- `LikeButton` and `LikesProvider` exist under `client/src/components/buttons/LikeButton/` and `client/src/providers/LikesProvider/`.

## Step 1: Define entity type constant

1. Open `client/src/providers/LikesProvider/LikesProvider.tsx`.
2. Add and export a new constant for your section, e.g.:
   - `export const ENTITY_TYPE_PETS_FOR_SALE = "pets-for-sale";`
   - For a new section: `export const ENTITY_TYPE_CARS = "vehicles-cars";` (or similar).
3. Use this exact string for:
   - `LikeButton` `entityType` prop on cards and detail.
   - Storage keys (handled by `likesStorage` via `entityType`).
   - Server actions and `AdLike` documents (no code change needed; they accept any `entityType` string).

If your section is the first one using likes, the constant already exists (e.g. `ENTITY_TYPE_PETS_FOR_SALE`). For a new section, add a new constant and reuse the same provider/actions/model.

## Step 2: Add LikeButton to listing cards

1. Open the card component for the section (e.g. `PetForSaleCard.tsx`, or `CarCard.tsx`).
2. Import `LikeButton` and the entity type constant:
   ```ts
   import LikeButton from "@/components/buttons/LikeButton/LikeButton";
   import { ENTITY_TYPE_XXX } from "@/providers/LikesProvider/LikesProvider";
   ```
3. In the card JSX, render `LikeButton` with **`stopPropagation={true}`** (or omit; default is true) so clicking the heart does not trigger the parent `Link`.
4. Pass `entityType={ENTITY_TYPE_XXX}`, `publicId={entity.publicId}`, and optional `size` (e.g. 18).
5. In the card styles file, add a wrapper for positioning (e.g. `LikeButtonWrapper`):
   - Position absolute, top-right (e.g. `top: var(--space-2); right: var(--space-2);`), `z-index: 1` so the button sits above the image.
6. Wrap `LikeButton` with this styled wrapper inside the card (e.g. inside the main Card, so it overlays the image area).

**Important:** The parent Cards component should wrap each card with `Link`; the card itself must not contain a `Link` around the whole content. The like button lives inside the card and stops propagation so only the button click is handled.

Reference: `client/src/app/(public)/pets/for-sale/_components/PetForSaleCards/PetForSaleCard.tsx` and `PetForSaleCard.styles.ts` (LikeButtonWrapper, LikeButton with stopPropagation).

## Step 3: Add LikeButton to detail page

1. Open the detail client component for the section (e.g. `PetForSaleDetailClient.tsx`, or `CarDetailClient.tsx`).
2. Import `LikeButton` and the entity type constant (same as step 2).
3. In the header section (e.g. next to the page title), render `LikeButton` with **`stopPropagation={false}`** so normal button behavior applies (no Link).
4. Pass `entityType={ENTITY_TYPE_XXX}`, `publicId={entity.publicId}`, and optional `size` (e.g. 20).

Reference: `client/src/app/(public)/pets/for-sale/_components/PetForSaleDetailClient/PetForSaleDetailClient.tsx` (LikeButton in HeaderSection next to PageTitle).

## Step 4: Guest merge for the new entity type (optional)

If the section should support guest likes that merge on login:

1. In `LikesProvider`, the guest hydration effect reads from storage using `getLikedFromStorage(entityType)` when `user` is null; ensure the same `entityType` constant is used when calling `setLikedInStorage` / `removeLikedInStorage` in the toggle path for guests.
2. The login-merge effect currently runs for `ENTITY_TYPE_PETS_FOR_SALE` and merges `getLikedFromStorage(ENTITY_TYPE_PETS_FOR_SALE)`. To support multiple entity types, extend the merge logic to iterate over all known entity types (e.g. call `mergeGuestLikes` for each type that has guest likes in storage), then clear storage for each and update `likedIdsByEntity` from the merge results. Reference: current implementation merges one type; extend similarly for additional constants.

If you only add one new section and the product does not require guest merge for that section yet, you can defer this step; authenticated likes will still work.

## Step 5: Verify layout hydration

- Root layout should already call `getLikedAdIdsByUser(user.id)` when `user` exists and pass the result as `initialLikedIds` to `LikesProvider`. `getLikedAdIdsByUser` returns all entity types for that user; no layout change is needed when adding a new entity type.
- If layout does not yet use `LikesProvider`, add it: fetch `initialLikedIds` when user is present, pass `{}` when not, and wrap the app (inside AuthProvider) with `<LikesProvider initialLikedIds={initialLikedIds}>`. See `client/src/app/layout.tsx` for the pattern.

## Checklist

- [ ] Entity type constant defined and exported from LikesProvider (or shared constants).
- [ ] LikeButton on listing card with `stopPropagation` true and wrapper for position (e.g. top-right).
- [ ] LikeButton on detail page with `stopPropagation` false.
- [ ] Same `entityType` and `publicId` used in both places.
- [ ] Layout wraps app with LikesProvider and passes initialLikedIds (already done if likes exist for another section).
- [ ] If guest merge is required for the new section, extend merge effect in LikesProvider for the new entity type.

## Pitfalls

- **Card navigates on heart click:** Use `stopPropagation={true}` on the card’s LikeButton and ensure the card is wrapped by Link in the parent, not the other way around.
- **Wrong entity type:** Use the same constant for cards, detail, and any storage/merge logic; typo or different string will break "liked" state and merge.
- **Provider missing:** LikeButton uses `useLikes()`; the tree must be wrapped with LikesProvider (usually in root layout).

## References

- Rule: `.cursor/rules/sima-likes.mdc`
- LikeButton: `client/src/components/buttons/LikeButton/LikeButton.tsx`
- LikesProvider: `client/src/providers/LikesProvider/LikesProvider.tsx`
- Pets for sale card: `client/src/app/(public)/pets/for-sale/_components/PetForSaleCards/PetForSaleCard.tsx` and `PetForSaleCard.styles.ts`
- Pets for sale detail: `client/src/app/(public)/pets/for-sale/_components/PetForSaleDetailClient/PetForSaleDetailClient.tsx`
- Layout: `client/src/app/layout.tsx`
