"use client";

import { FC, ReactNode, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { DropdownMenu as RadixDropdownMenu, Flex, Text } from "@radix-ui/themes";
import { usePortalTarget } from "@/providers/PortalProvider/PortalProvider";
import type {
  DropdownMenuItem,
  DropdownMenuItemColor,
  DropdownMenuSubmenuItemContent,
  DropdownMenuTriggerMode,
} from "./DropdownMenu.types";

const HOVER_CLOSE_DELAY_MS = 200;
/** Ignore trigger mouseLeave this long after opening (avoids blink when portaled content overlays trigger) */
const HOVER_OPEN_GRACE_MS = 250;

export interface DropdownMenuContentProps {
  size?: "1" | "2";
  variant?: "solid" | "soft";
  color?: DropdownMenuItemColor;
  highContrast?: boolean;
  align?: "start" | "center" | "end";
  container?: HTMLElement | null;
}

export interface DropdownMenuProps {
  /** Custom trigger element (e.g. Button, IconButton). Must be a single React element. */
  trigger: ReactNode;
  /** Array of menu items: link, action, separator, or submenu */
  items: DropdownMenuItem[];
  /** Open menu on "click" (default) or "hover" */
  triggerMode?: DropdownMenuTriggerMode;
  /** Optional props for the dropdown content */
  contentProps?: Omit<DropdownMenuContentProps, "container">;
}

function renderItemContent(
  label: string,
  icon?: ReactNode
): ReactNode {
  if (icon) {
    return (
      <Flex gap="2" align="center">
        {icon}
        <Text size="2">{label}</Text>
      </Flex>
    );
  }
  return <Text size="2">{label}</Text>;
}

function renderSubmenuItems(items: DropdownMenuSubmenuItemContent[]) {
  return items.map((item, index) => {
    if (item.type === "separator") {
      return <RadixDropdownMenu.Separator key={`sep-${index}`} />;
    }

    if (item.type === "link") {
      return (
        <RadixDropdownMenu.Item
          key={`${item.href}-${index}`}
          asChild
          shortcut={item.shortcut}
        >
          <Link href={item.href}>
            {renderItemContent(item.label, item.icon)}
          </Link>
        </RadixDropdownMenu.Item>
      );
    }

    if (item.type === "action") {
      return (
        <RadixDropdownMenu.Item
          key={`${item.label}-${index}`}
          shortcut={item.shortcut}
          color={item.color}
          onSelect={() => item.onClick()}
        >
          {renderItemContent(item.label, item.icon)}
        </RadixDropdownMenu.Item>
      );
    }

    return null;
  });
}

function renderTopLevelItems(items: DropdownMenuItem[]) {
  return items.map((item, index) => {
    if (item.type === "separator") {
      return <RadixDropdownMenu.Separator key={`sep-${index}`} />;
    }

    if (item.type === "link") {
      return (
        <RadixDropdownMenu.Item
          key={`${item.href}-${index}`}
          asChild
          shortcut={item.shortcut}
        >
          <Link href={item.href}>
            {renderItemContent(item.label, item.icon)}
          </Link>
        </RadixDropdownMenu.Item>
      );
    }

    if (item.type === "action") {
      return (
        <RadixDropdownMenu.Item
          key={`${item.label}-${index}`}
          shortcut={item.shortcut}
          color={item.color}
          onSelect={() => item.onClick()}
        >
          {renderItemContent(item.label, item.icon)}
        </RadixDropdownMenu.Item>
      );
    }

    if (item.type === "submenu") {
      return (
        <RadixDropdownMenu.Sub key={`sub-${item.label}-${index}`}>
          <RadixDropdownMenu.SubTrigger>
            {renderItemContent(item.label, item.icon)}
          </RadixDropdownMenu.SubTrigger>
          <RadixDropdownMenu.SubContent>
            {renderSubmenuItems(item.items)}
          </RadixDropdownMenu.SubContent>
        </RadixDropdownMenu.Sub>
      );
    }

    return null;
  });
}

const DropdownMenuComponent: FC<DropdownMenuProps> = ({
  trigger,
  items,
  triggerMode = "click",
  contentProps = {},
}) => {
  const { portalTarget: _portalTarget } = usePortalTarget();
  const {
    size = "2",
    variant = "solid",
    color,
    highContrast,
    align = "start",
    ...restContentProps
  } = contentProps;

  const isHoverMode = triggerMode === "hover";
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openSinceRef = useRef<number | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, HOVER_CLOSE_DELAY_MS);
  }, [clearCloseTimeout]);

  const handleTriggerMouseEnter = useCallback(() => {
    if (!isHoverMode) return;
    clearCloseTimeout();
    openSinceRef.current = Date.now();
    setOpen(true);
  }, [isHoverMode, clearCloseTimeout]);

  const handleTriggerMouseLeave = useCallback(() => {
    if (!isHoverMode) return;
    // Ignore leave for a short time after opening: portaled content can overlay the trigger
    // and cause a spurious mouseLeave, which would close the menu immediately (blink).
    if (
      openSinceRef.current !== null &&
      Date.now() - openSinceRef.current < HOVER_OPEN_GRACE_MS
    ) {
      return;
    }
    scheduleClose();
  }, [isHoverMode, scheduleClose]);

  const handleContentMouseEnter = useCallback(() => {
    if (!isHoverMode) return;
    clearCloseTimeout();
  }, [isHoverMode, clearCloseTimeout]);

  const handleContentMouseLeave = useCallback(() => {
    if (!isHoverMode) return;
    scheduleClose();
  }, [isHoverMode, scheduleClose]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) {
        clearCloseTimeout();
        openSinceRef.current = null;
      }
      setOpen(next);
    },
    [clearCloseTimeout]
  );

  const rootProps = isHoverMode
    ? { open, onOpenChange: handleOpenChange }
    : {};

  return (
    <RadixDropdownMenu.Root {...rootProps}>
      {isHoverMode ? (
        <span
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={handleTriggerMouseLeave}
          style={{ display: "inline-flex" }}
        >
          <RadixDropdownMenu.Trigger>{trigger}</RadixDropdownMenu.Trigger>
        </span>
      ) : (
        <RadixDropdownMenu.Trigger>{trigger}</RadixDropdownMenu.Trigger>
      )}
      <RadixDropdownMenu.Content
        size={size}
        variant={variant}
        color={color}
        highContrast={highContrast}
        align={align}
        // container={portalTarget}
        {...restContentProps}
        {...(isHoverMode
          ? {
              onMouseEnter: handleContentMouseEnter,
              onMouseLeave: handleContentMouseLeave,
            }
          : {})}
      >
        {isHoverMode ? (
          <span
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={handleContentMouseLeave}
            style={{ display: "block", outline: "none" }}
          >
            {renderTopLevelItems(items)}
          </span>
        ) : (
          renderTopLevelItems(items)
        )}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Root>
  );
};

/** Chevron icon for dropdown trigger (e.g. Options ▾) */
export const DropdownMenuTriggerIcon = RadixDropdownMenu.TriggerIcon;

const DropdownMenu = Object.assign(DropdownMenuComponent, {
  TriggerIcon: DropdownMenuTriggerIcon,
});

export default DropdownMenu;
