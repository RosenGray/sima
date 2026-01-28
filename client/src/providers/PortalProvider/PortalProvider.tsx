"use client";

import { RADIX_THEME_PORTAL_ID } from "@/config/client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface PortalContextValue {
  portalTarget: HTMLElement | null;
}

const PortalContext = createContext<PortalContextValue>({
  portalTarget: null,
});

export function PortalProvider({ children }: { children: ReactNode }) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Only runs on client after mount
    const element = document.getElementById(RADIX_THEME_PORTAL_ID);
    setPortalTarget(element);
  }, []);

  return (
    <PortalContext.Provider value={{ portalTarget }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortalTarget() {
  return useContext(PortalContext);
}
