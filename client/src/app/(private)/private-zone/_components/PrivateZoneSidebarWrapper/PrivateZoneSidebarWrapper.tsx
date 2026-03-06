"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IconButton } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  PrivateZoneSidebar,
  SidebarToggleStrip,
} from "../../layout.styles";
import PrivateZoneSidebarContent from "../PrivateZoneSidebarContent/PrivateZoneSidebarContent";

const STORAGE_KEY = "private-zone-sidebar-collapsed";

export default function PrivateZoneSidebarWrapper() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setCollapsed(true);
  }, []);

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, String(next));
      }
      return next;
    });
  }, []);

  return (
    <>
      <SidebarToggleStrip>
        <IconButton
          variant="ghost"
          color="gray"
          size="2"
          onClick={toggle}
          aria-label={collapsed ? "Развернуть боковую панель" : "Свернуть боковую панель"}
        >
          {collapsed ? (
            <ChevronRightIcon width="18" height="18" />
          ) : (
            <ChevronLeftIcon width="18" height="18" />
          )}
        </IconButton>
      </SidebarToggleStrip>
      <PrivateZoneSidebar $collapsed={collapsed}>
        <PrivateZoneSidebarContent />
      </PrivateZoneSidebar>
    </>
  );
}
