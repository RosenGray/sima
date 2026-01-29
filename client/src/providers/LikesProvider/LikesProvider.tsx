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
      const fromStorage = getLikedFromStorage(ENTITY_TYPE_PETS_FOR_SALE);
      if (fromStorage.length > 0) {
        next[ENTITY_TYPE_PETS_FOR_SALE] = new Set(fromStorage);
      }
      return next;
    });
  }, [user]);

  // On login: merge guest likes from localStorage into DB, then clear storage and refresh state
  useEffect(() => {
    const wasGuest = previousUserRef.current === null;
    previousUserRef.current = user ?? null;

    if (!user || mergeDoneRef.current || !wasGuest) return;

    const guestIds = getLikedFromStorage(ENTITY_TYPE_PETS_FOR_SALE);
    if (guestIds.length === 0) {
      mergeDoneRef.current = true;
      return;
    }

    mergeDoneRef.current = true;
    mergeGuestLikes(ENTITY_TYPE_PETS_FOR_SALE, guestIds).then((result) => {
      setLikedInStorage(ENTITY_TYPE_PETS_FOR_SALE, []);
      if (result.success && result.likedIds) {
        setLikedIdsByEntity((prev) => ({
          ...prev,
          [ENTITY_TYPE_PETS_FOR_SALE]: new Set(result.likedIds),
        }));
      }
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

      if (user) {
        const action = currentlyLiked ? removeLike : addLike;
        const result = await action(entityType, publicId);
        if (!result.success) return;
        setLikedIdsByEntity((prev) => {
          const set = new Set(prev[entityType] ?? []);
          if (result.liked) {
            set.add(publicId);
          } else {
            set.delete(publicId);
          }
          return { ...prev, [entityType]: set };
        });
      } else {
        if (currentlyLiked) {
          removeLikedInStorage(entityType, publicId);
        } else {
          const arr = getLikedFromStorage(entityType);
          if (!arr.includes(publicId)) {
            setLikedInStorage(entityType, [...arr, publicId]);
          }
        }
        setLikedIdsByEntity((prev) => {
          const set = new Set(prev[entityType] ?? []);
          if (currentlyLiked) {
            set.delete(publicId);
          } else {
            set.add(publicId);
          }
          return { ...prev, [entityType]: set };
        });
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