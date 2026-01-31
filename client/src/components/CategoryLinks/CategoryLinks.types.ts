export interface CategoryLinkItem {
  href: string;
  label: string;
  imageUrl: string;
}

export interface CategoryLinksProps {
  items: CategoryLinkItem[];
  ariaLabel?: string;
  className?: string;
}
