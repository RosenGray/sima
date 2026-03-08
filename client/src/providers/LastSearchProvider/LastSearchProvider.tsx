"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { mergeGuestSearches } from "@/lib/last-search/actions/lastSearch.actions";
import {
  getLastSearchesFromStorage,
  clearLastSearchesFromStorage,
} from "@/lib/last-search/storage/lastSearchStorage";

type LastSearchContextType = {
  lastSearchCount: number;
};

const LastSearchContext = createContext<LastSearchContextType | undefined>(undefined);

interface LastSearchProviderProps {
  children: React.ReactNode;
  initialSearchCount?: number;
}

export function LastSearchProvider({
  children,
  initialSearchCount = 0,
}: LastSearchProviderProps) {
  const { user } = useAuth();
  const previousUserRef = useRef<typeof user>(null);
  const mergeDoneRef = useRef(false);
  const [lastSearchCount, setLastSearchCount] = useState(initialSearchCount);

  // Hydrate count from localStorage for guests
  useEffect(() => {
    if (user) return;
    setLastSearchCount(getLastSearchesFromStorage().length);
  }, [user]);

  // Keep count in sync whenever a search is saved (fires for both guests and logged-in users)
  useEffect(() => {
    const handler = (e: Event) => {
      const count = (e as CustomEvent<{ count: number }>).detail.count;
      setLastSearchCount(count);
    };
    window.addEventListener("sima-search-added", handler);
    return () => window.removeEventListener("sima-search-added", handler);
  }, []);

  // On login: merge guest searches from localStorage into DB, then clear storage
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
        setLastSearchCount(result.searches.length);
      }
    });
  }, [user]);

  return (
    <LastSearchContext.Provider value={{ lastSearchCount }}>
      {children}
    </LastSearchContext.Provider>
  );
}

export function useLastSearch(): LastSearchContextType {
  const context = useContext(LastSearchContext);
  if (context === undefined) {
    throw new Error("useLastSearch must be used within a LastSearchProvider");
  }
  return context;
}
