"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

export const ENTITY_TYPE_PETS_FOR_SALE = "pets-for-sale";
export const ENTITY_TYPE_PROFESSIONAL_SERVICE = "professional-service";
export const ENTITY_TYPE_JOBS = "jobs";
export const ENTITY_TYPE_PETS_ACCESSORIES = "pets-accessories";
export const ENTITY_TYPE_PETS_FOR_FREE = "pets-for-free";
export const ENTITY_TYPE_CARS = "vehicles-cars";
export const ENTITY_TYPE_OFF_ROAD = "vehicles-off-road";
export const ENTITY_TYPE_COMMERCIAL_VEHICLES = "vehicles-commercial";
export const ENTITY_TYPE_MOTORCYCLES = "vehicles-motorcycles";
export const ENTITY_TYPE_SCOOTERS = "vehicles-scooters";

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
] as const;

type LikedIdsByEntity = Record<string, Set<string>>;

type LikesContextType = {
  isLiked: (entityType: string, publicId: string) => boolean;
  toggle: (entityType: string, publicId: string) => Promise<void>;
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
    (entityType: string, publicId: string): boolean => {
      return likedIdsByEntity[entityType]?.has(publicId) ?? false;
    },
    [likedIdsByEntity]
  );

  const toggle = useCallback(
    async (entityType: string, publicId: string) => {
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

  const value: LikesContextType = { isLiked, toggle };

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