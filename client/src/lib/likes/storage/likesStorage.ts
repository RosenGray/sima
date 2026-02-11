import { EntityType } from "@/lib/constants/entityTypes";

const STORAGE_KEY_PREFIX = "sima-liked-";

function getStorageKey(entityType: EntityType): string {
  return `${STORAGE_KEY_PREFIX}${entityType}`;
}

/**
 * Get liked public IDs for an entity type from localStorage.
 * Safe for SSR (returns [] when window is undefined).
 */
export function getLikedFromStorage(entityType: EntityType): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getStorageKey(entityType));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Set the full list of liked public IDs for an entity type in localStorage.
 */
export function setLikedInStorage(entityType: EntityType, publicIds: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStorageKey(entityType), JSON.stringify(publicIds));
  } catch {
    // ignore
  }
}

/**
 * Add one public ID to likes in localStorage.
 */
export function addLikedInStorage(entityType: EntityType, publicId: string): void {
  const ids = getLikedFromStorage(entityType);
  if (ids.includes(publicId)) return;
  setLikedInStorage(entityType, [...ids, publicId]);
}

/**
 * Remove one public ID from likes in localStorage.
 */
export function removeLikedInStorage(entityType: EntityType, publicId: string): void {
  const ids = getLikedFromStorage(entityType).filter((id) => id !== publicId);
  setLikedInStorage(entityType, ids);
}
