import type React from "react";

export interface CategoryLinkItem {
  href: string;
  label: string;
  imageUrl: string;
}

export interface CategoryImagesLinksProps {
  items: CategoryLinkItem[];
  ariaLabel?: string;
  className?: string;
}

export interface CategorySvgLinkItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface CategorySvgLinkIconSize {
  width?: number;
  height?: number;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

export interface CategorySvgLinksProps {
  items: CategorySvgLinkItem[];
  ariaLabel?: string;
  className?: string;
  iconSize?: CategorySvgLinkIconSize;
}
