import type { ListingCardProps } from "@/components/ListingCard/ListingCard.types";

/** Card data + href for carousel slide (each card is a link). */
export type ListingCardCarouselItem = ListingCardProps & {
  href: string;
};

export interface ListingCardCarouselProps {
  items: ListingCardCarouselItem[];
  /** When true, carousel loops: after the last slide, the first slide appears again (and vice versa). */
  infinite?: boolean;
  /** Optional aria-label for the carousel. */
  ariaLabel?: string;
  className?: string;
}
