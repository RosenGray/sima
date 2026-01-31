import type { ReactNode } from "react";

/**
 * Radix Themes color values for menu items (e.g. destructive actions use "red")
 */
export type DropdownMenuItemColor =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

/**
 * Link item – navigates to href (uses Next.js Link)
 */
export type DropdownMenuLinkItem = {
  type: "link";
  label: string;
  href: string;
  icon?: ReactNode;
  shortcut?: string;
};

/**
 * Action item – calls onClick when selected
 */
export type DropdownMenuActionItem = {
  type: "action";
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  shortcut?: string;
  color?: DropdownMenuItemColor;
};

/**
 * Separator – visual divider between items
 */
export type DropdownMenuSeparatorItem = {
  type: "separator";
};

/**
 * Submenu – nested items (no nested submenus)
 */
export type DropdownMenuSubmenuItem = {
  type: "submenu";
  label: string;
  icon?: ReactNode;
  items: DropdownMenuSubmenuItemContent[];
};

/** Items allowed inside a submenu (no nested submenus) */
export type DropdownMenuSubmenuItemContent =
  | DropdownMenuLinkItem
  | DropdownMenuActionItem
  | DropdownMenuSeparatorItem;

/**
 * Generic dropdown menu item
 */
export type DropdownMenuItem =
  | DropdownMenuLinkItem
  | DropdownMenuActionItem
  | DropdownMenuSeparatorItem
  | DropdownMenuSubmenuItem;
