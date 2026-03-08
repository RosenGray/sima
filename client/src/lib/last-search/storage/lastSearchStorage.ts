import { EntityType } from "@/lib/constants/entityTypes";

const STORAGE_KEY = "sima-last-searches";

export interface StoredSearch {
  entityType: EntityType;
  title: string;
  url: string;
  thumbnail: string;
  searchParamsHash: string;
}

export function getLastSearchesFromStorage(): StoredSearch[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredSearch[]) : [];
  } catch {
    return [];
  }
}

export function addLastSearchToStorage(search: StoredSearch): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLastSearchesFromStorage().filter(
      (s) => s.searchParamsHash !== search.searchParamsHash
    );
    const next = [search, ...existing].slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("sima-search-added", { detail: { count: next.length } }));
  } catch {
    // ignore
  }
}

export function clearLastSearchesFromStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
