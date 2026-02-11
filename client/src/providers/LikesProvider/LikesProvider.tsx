"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import {
  addLike,
  mergeGuestLikes,
  removeLike,
} from "@/lib/likes/actions/likes.actions";
import {
  getLikedFromStorage,
  removeLikedInStorage,
  setLikedInStorage,
} from "@/lib/likes/storage/likesStorage";
import {
  ENTITY_TYPE_CARS,
  ENTITY_TYPE_COMMERCIAL_REAL_ESTATE,
  ENTITY_TYPE_COMMERCIAL_VEHICLES,
  ENTITY_TYPE_JOBS,
  ENTITY_TYPE_MOTORCYCLES,
  ENTITY_TYPE_OFF_ROAD,
  ENTITY_TYPE_PETS_ACCESSORIES,
  ENTITY_TYPE_PETS_FOR_FREE,
  ENTITY_TYPE_PETS_FOR_SALE,
  ENTITY_TYPE_PROFESSIONAL_SERVICE,
  ENTITY_TYPE_REAL_ESTATE_FOR_RENT,
  ENTITY_TYPE_REAL_ESTATE_FOR_SALE,
  ENTITY_TYPE_SCOOTERS,
  ENTITY_TYPE_SPECIAL_VEHICLES,
  ENTITY_TYPE_VEHICLES_ACCESSORIES,
  ENTITY_TYPE_YAD2,
  EntityType,
} from "@/lib/constants/entityTypes";

const ENTITY_TYPES_WITH_GUEST_MERGE = [
  ENTITY_TYPE_PETS_FOR_SALE,
  ENTITY_TYPE_PROFESSIONAL_SERVICE,
  ENTITY_TYPE_JOBS,
  ENTITY_TYPE_PETS_ACCESSORIES,
  ENTITY_TYPE_PETS_FOR_FREE,
  ENTITY_TYPE_CARS,
  ENTITY_TYPE_OFF_ROAD,
  ENTITY_TYPE_COMMERCIAL_VEHICLES,
  ENTITY_TYPE_MOTORCYCLES,
  ENTITY_TYPE_SCOOTERS,
  ENTITY_TYPE_SPECIAL_VEHICLES,
  ENTITY_TYPE_VEHICLES_ACCESSORIES,
  ENTITY_TYPE_COMMERCIAL_REAL_ESTATE,
  ENTITY_TYPE_REAL_ESTATE_FOR_RENT,
  ENTITY_TYPE_REAL_ESTATE_FOR_SALE,
  ENTITY_TYPE_YAD2,
] as const;

type LikedIdsByEntity = Record<string, Set<string>>;

type LikesContextType = {
  isLiked: (entityType: EntityType, publicId: string) => boolean;
  toggle: (entityType: EntityType, publicId: string) => Promise<void>;
  totalLikedCount: number;
};

const LikesContext = createContext<LikesContextType | undefined>(undefined);

function recordFromArrays(initial: Record<string, string[]>): LikedIdsByEntity {
  const out: LikedIdsByEntity = {};
  for (const [k, arr] of Object.entries(initial)) {
    out[k] = new Set(arr);
  }
  return out;
}

interface LikesProviderProps {
  children: React.ReactNode;
  initialLikedIds: Record<string, string[]>;
}

export function LikesProvider({ children, initialLikedIds }: LikesProviderProps) {
  const { user } = useAuth();
  const [likedIdsByEntity, setLikedIdsByEntity] = useState<LikedIdsByEntity>(
    () => recordFromArrays(initialLikedIds)
  );
  const previousUserRef = useRef<typeof user>(null);
  const mergeDoneRef = useRef(false);

  // Hydrate from localStorage when guest (no user)
  useEffect(() => {
    if (user) return;
    setLikedIdsByEntity((prev) => {
      const next = { ...prev };
      for (const entityType of ENTITY_TYPES_WITH_GUEST_MERGE) {
        const fromStorage = getLikedFromStorage(entityType);
        if (fromStorage.length > 0) {
          next[entityType] = new Set(fromStorage);
        }
      }
      return next;
    });
  }, [user]);

  // On login: merge guest likes from localStorage into DB, then clear storage and refresh state
  useEffect(() => {
    const wasGuest = previousUserRef.current === null;
    previousUserRef.current = user ?? null;

    if (!user || mergeDoneRef.current || !wasGuest) return;

    const entityTypesWithGuestLikes = ENTITY_TYPES_WITH_GUEST_MERGE.filter(
      (entityType) => getLikedFromStorage(entityType).length > 0
    );
    if (entityTypesWithGuestLikes.length === 0) {
      mergeDoneRef.current = true;
      return;
    }

    mergeDoneRef.current = true;
    Promise.all(
      entityTypesWithGuestLikes.map((entityType) => {
        const guestIds = getLikedFromStorage(entityType);
        return mergeGuestLikes(entityType, guestIds).then((result) => {
          setLikedInStorage(entityType, []);
          return { entityType, result };
        });
      })
    ).then((results) => {
      setLikedIdsByEntity((prev) => {
        const next = { ...prev };
        for (const { entityType, result } of results) {
          if (result.success && result.likedIds) {
            next[entityType] = new Set(result.likedIds);
          }
        }
        return next;
      });
    });
  }, [user]);

  const isLiked = useCallback(
    (entityType: EntityType, publicId: string): boolean => {
      return likedIdsByEntity[entityType]?.has(publicId) ?? false;
    },
    [likedIdsByEntity]
  );

  const totalLikedCount = useMemo(() => {
    let total = 0;
    for (const entityType of ENTITY_TYPES_WITH_GUEST_MERGE) {
      total += likedIdsByEntity[entityType]?.size ?? 0;
    }
    return total;
  }, [likedIdsByEntity]);

  const toggle = useCallback(
    async (entityType: EntityType, publicId: string) => {
      const currentlyLiked = likedIdsByEntity[entityType]?.has(publicId) ?? false;
      const nextLiked = !currentlyLiked;

      // Optimistic update: apply immediately for instant feedback
      setLikedIdsByEntity((prev) => {
        const set = new Set(prev[entityType] ?? []);
        if (nextLiked) {
          set.add(publicId);
        } else {
          set.delete(publicId);
        }
        return { ...prev, [entityType]: set };
      });

      if (user) {
        const action = currentlyLiked ? removeLike : addLike;
        const result = await action(entityType, publicId);
        if (!result.success) {
          // Revert on server failure
          setLikedIdsByEntity((prev) => {
            const set = new Set(prev[entityType] ?? []);
            if (currentlyLiked) {
              set.add(publicId);
            } else {
              set.delete(publicId);
            }
            return { ...prev, [entityType]: set };
          });
        }
      } else {
        if (currentlyLiked) {
          removeLikedInStorage(entityType, publicId);
        } else {
          const arr = getLikedFromStorage(entityType);
          if (!arr.includes(publicId)) {
            setLikedInStorage(entityType, [...arr, publicId]);
          }
        }
      }
    },
    [user, likedIdsByEntity]
  );

  const value: LikesContextType = { isLiked, toggle, totalLikedCount };

  return (
    <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
  );
}

export function useLikes(): LikesContextType {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error("useLikes must be used within a LikesProvider");
  }
  return context;
}