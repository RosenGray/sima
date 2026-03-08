"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { mergeGuestSearches } from "@/lib/last-search/actions/lastSearch.actions";
import {
  getLastSearchesFromStorage,
  clearLastSearchesFromStorage,
} from "@/lib/last-search/storage/lastSearchStorage";

interface LastSearchProviderProps {
  children: React.ReactNode;
}

export function LastSearchProvider({ children }: LastSearchProviderProps) {
  const { user } = useAuth();
  const previousUserRef = useRef<typeof user>(null);
  const mergeDoneRef = useRef(false);

  useEffect(() => {
    const wasGuest = previousUserRef.current === null;
    previousUserRef.current = user ?? null;

    if (!user || mergeDoneRef.current || !wasGuest) return;

    const storageItems = getLastSearchesFromStorage();
    if (storageItems.length === 0) {
      mergeDoneRef.current = true;
      return;
    }

    mergeDoneRef.current = true;
    mergeGuestSearches(storageItems).then((result) => {
      if (result.success) {
        clearLastSearchesFromStorage();
      }
    });
  }, [user]);

  return <>{children}</>;
}
