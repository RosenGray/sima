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

Entity type constants and the `EntityType` type live in `client/src/lib/constants/entityTypes.ts`. For a new section, add the constant there (e.g. `ENTITY_TYPE_CARS = "vehicles-cars"`), then use it in `LikeButton`, storage helpers, and server actions. Server actions and the `AdLike` model use `EntityType`; no separate code change is needed when adding a new constant. If your section already has a constant (e.g. `ENTITY_TYPE_PETS_FOR_SALE`), import it from `@/lib/constants/entityTypes` and use it everywhere for that section.

## Step 2: Add LikeButton to listing cards

1. Open the card component for the section (e.g. `PetForSaleCard.tsx`, or `CarCard.tsx`).
2. Import `LikeButton` and the entity type constant:
   ```ts
   import LikeButton from "@/components/buttons/LikeButton/LikeButton";
   import { ENTITY_TYPE_XXX } from "@/lib/constants/entityTypes";
   ```
3. In the card JSX, render `LikeButton` with **`stopPropagation={true}`** (or omit; default is true) so clicking the heart does not trigger the parent `Link`.
4. Pass `entityType={ENTITY_TYPE_XXX}`, `publicId={entity.publicId}`, and optional `size` (e.g. 18).
5. In the card styles file, add a wrapper for positioning (e.g. `LikeButtonWrapper`):
   - Position absolute, top-right (e.g. `top: var(--space-2); right: var(--space-2);`), `z-index: 1`. Give the main Card styled component `position: relative` so the wrapper positions correctly.
   - LikeButton applies `cursor: pointer` by default for clear clickability on both cards and detail pages.
6. Place the wrapper as a **direct child of the styled Card** (e.g. first child, same level as the card header), so the button appears in the header area above the image—**not** inside the image section or overlaid on the image. See `CarCard.tsx` / `CarCard.styles.ts` for the pattern.

**Important:** The parent Cards component should wrap each card with `Link`; the card itself must not contain a `Link` around the whole content. The like button lives inside the card and stops propagation so only the button click is handled.

Reference: `client/src/app/(public)/vehicles/cars/_components/CarCards/CarCard.tsx` and `CarCard.styles.ts` (LikeButtonWrapper as first child of card, Card with position: relative).

## Step 3: Add LikeButton to detail page

1. Open the detail client component for the section (e.g. `PetForSaleDetailClient.tsx`, or `CarDetailClient.tsx`).
2. Import `LikeButton`, `Flex`, and the entity type constant from `@/lib/constants/entityTypes` (same as step 2).
3. In the header section, place the **title and LikeButton as siblings** inside a `Flex` with `align="center"` and `gap="3"` (and e.g. `style={{ flex: 1, minWidth: 0 }}`) so the button is vertically aligned and has clear spacing from the title. **Do not** nest LikeButton inside the PageTitle/Heading.
4. Render `LikeButton` with **`stopPropagation={false}`** so normal button behavior applies (no Link).
5. Pass `entityType={ENTITY_TYPE_XXX}`, `publicId={entity.publicId}`, and optional `size` (e.g. 20).
6. LikeButton applies `cursor: pointer` by default for clear clickability.

Reference: `client/src/app/(public)/vehicles/cars/_components/CarDetailClient/CarDetailClient.tsx` (Flex with PageTitle + LikeButton in HeaderSection).

## Step 4: Guest merge for the new entity type (optional)

If the section should support guest likes that merge on login:

1. In `LikesProvider`, the guest hydration effect reads from storage using `getLikedFromStorage(entityType)` when `user` is null; ensure the same entity type constant from `@/lib/constants/entityTypes` is used when calling `setLikedInStorage` / `removeLikedInStorage` in the toggle path for guests.
2. The login-merge effect runs for entity types listed in `ENTITY_TYPES_WITH_GUEST_MERGE` (using constants from `@/lib/constants/entityTypes`) and merges `getLikedFromStorage(entityType)` for each. To support multiple entity types, extend that list and the merge logic to iterate over all known entity types (e.g. call `mergeGuestLikes` for each type that has guest likes in storage), then clear storage for each and update `likedIdsByEntity` from the merge results.

If you only add one new section and the product does not require guest merge for that section yet, you can defer this step; authenticated likes will still work.

## Optimistic updates

- The like toggle uses **optimistic updates**: the UI (heart color) changes immediately on click; the server action runs in the background. If the server fails, the state reverts. This avoids the 0.1–0.5s delay when waiting for the server.

## Step 5: Verify layout hydration

- Root layout should already call `getLikedAdIdsByUser(user.id)` when `user` exists and pass the result as `initialLikedIds` to `LikesProvider`. `getLikedAdIdsByUser` returns all entity types for that user; no layout change is needed when adding a new entity type.
- If layout does not yet use `LikesProvider`, add it: fetch `initialLikedIds` when user is present, pass `{}` when not, and wrap the app (inside AuthProvider) with `<LikesProvider initialLikedIds={initialLikedIds}>`. See `client/src/app/layout.tsx` for the pattern.

## Checklist

- [ ] Entity type constant from `@/lib/constants/entityTypes` used for this section (add there if new).
- [ ] LikeButton on listing card with `stopPropagation` true and wrapper for position (e.g. top-right). LikeButton uses `cursor: pointer` by default.
- [ ] LikeButton on detail page with `stopPropagation` false. LikeButton uses `cursor: pointer` by default.
- [ ] Same `entityType` and `publicId` used in both places.
- [ ] Layout wraps app with LikesProvider and passes initialLikedIds (already done if likes exist for another section).
- [ ] If guest merge is required for the new section, extend merge effect in LikesProvider for the new entity type.

## Pitfalls

- **Card navigates on heart click:** Use `stopPropagation={true}` on the card’s LikeButton and ensure the card is wrapped by Link in the parent, not the other way around.
- **Wrong entity type:** Use the same constant from `@/lib/constants/entityTypes` for cards, detail, and any storage/merge logic; typo or different string will break "liked" state and merge.
- **Provider missing:** LikeButton uses `useLikes()`; the tree must be wrapped with LikesProvider (usually in root layout).

## References

- Rule: `.cursor/rules/sima-likes.mdc`
- LikeButton: `client/src/components/buttons/LikeButton/LikeButton.tsx`
- LikesProvider: `client/src/providers/LikesProvider/LikesProvider.tsx`
- Cars card (header-area LikeButton): `client/src/app/(public)/vehicles/cars/_components/CarCards/CarCard.tsx` and `CarCard.styles.ts`
- Cars detail (Flex + title + LikeButton): `client/src/app/(public)/vehicles/cars/_components/CarDetailClient/CarDetailClient.tsx`
- Pets for sale card: `client/src/app/(public)/pets/for-sale/_components/PetForSaleCards/PetForSaleCard.tsx` and `PetForSaleCard.styles.ts`
- Layout: `client/src/app/layout.tsx`
