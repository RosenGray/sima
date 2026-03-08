"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { EntityType } from "@/lib/constants/entityTypes";
import { ILastSearch } from "../models/LastSearch";
import { lastSearchRepository } from "../repository/LastSearchRepository";
import { normalizeSearchParams } from "../utils/normalizeSearchParams";
import { generateSearchTitle } from "../utils/generateSearchTitle";
import { getSearchThumbnail } from "../utils/getSearchThumbnail";

export async function saveLastSearch(
  entityType: EntityType,
  url: string,
  rawParams: Record<string, string | string[]>
): Promise<void> {
  try {
    const user = await getCurrentUser();
    if (!user) return;

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(rawParams)) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    }

    const hash = normalizeSearchParams(params);
    if (!hash) return;

    const title = generateSearchTitle(entityType, params);
    const thumbnail = getSearchThumbnail(entityType);

    await lastSearchRepository.upsertSearch(user.id, {
      entityType,
      title,
      url,
      thumbnail,
      searchParamsHash: hash,
    });
  } catch (error) {
    console.error("Error saving last search:", error);
  }
}

export async function getLastSearches(): Promise<ILastSearch[]> {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    return lastSearchRepository.getByUser(user.id);
  } catch (error) {
    console.error("Error getting last searches:", error);
    return [];
  }
}

export async function getLastSearchCount(): Promise<number> {
  try {
    const user = await getCurrentUser();
    if (!user) return 0;
    return lastSearchRepository.countByUser(user.id);
  } catch (error) {
    console.error("Error getting last search count:", error);
    return 0;
  }
}

export type StoredSearch = {
  entityType: EntityType;
  title: string;
  url: string;
  thumbnail: string;
  searchParamsHash: string;
};

export async function mergeGuestSearches(
  searches: StoredSearch[]
): Promise<
  | { success: true; searches: ILastSearch[] }
  | { success: false; error: string }
> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Необходимо войти в систему" };
    }

    const valid = searches
      .filter(
        (s) =>
          s.entityType &&
          s.url &&
          s.url.trim() !== "" &&
          s.searchParamsHash &&
          s.searchParamsHash.trim() !== ""
      )
      .slice(0, 5);

    const merged = await lastSearchRepository.mergeMany(user.id, valid);
    return { success: true, searches: merged };
  } catch (error) {
    console.error("Error merging guest searches:", error);
    return { success: false, error: "Не удалось синхронизировать поиски" };
  }
}
