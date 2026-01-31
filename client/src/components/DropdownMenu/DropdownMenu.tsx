"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { DropdownMenu as RadixDropdownMenu, Flex, Text } from "@radix-ui/themes";
import { usePortalTarget } from "@/providers/PortalProvider/PortalProvider";
import type {
  DropdownMenuItem,
  DropdownMenuItemColor,
  DropdownMenuSubmenuItemContent,
} from "./DropdownMenu.types";

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

function renderItems(items: DropdownMenuSubmenuItemContent[]) {
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

const DropdownMenuComponent: FC<DropdownMenuProps> = ({
  trigger,
  items,
  contentProps = {},
}) => {
  const { portalTarget } = usePortalTarget();
  const {
    size = "2",
    variant = "solid",
    color,
    highContrast,
    align = "start",
    ...restContentProps
  } = contentProps;

  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger>{trigger}</RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Content
        size={size}
        variant={variant}
        color={color}
        highContrast={highContrast}
        align={align}
        // container={portalTarget}
        {...restContentProps}
      >
        {items.map((item, index) => {
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
                  ssss
                  {renderItems(item.items)}
                </RadixDropdownMenu.SubContent>
              </RadixDropdownMenu.Sub>
            );
          }

          return null;
        })}
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
