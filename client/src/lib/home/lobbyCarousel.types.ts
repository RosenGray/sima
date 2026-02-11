import type { ListingCardCarouselItem } from "@/components/ListingCardCarousel/ListingCardCarousel.types";

/** A single carousel section on the home lobby page. */
export interface LobbyCarouselSection {
  /** Section heading (e.g. "Транспорт") */
  title: string;
  /** Link to the full listing page (e.g. "/vehicles/cars") */
  seeAllHref: string;
  /** Up to 10 newest items mapped to the generic card shape */
  items: ListingCardCarouselItem[];
}

/**
 * Shape produced by each per-entity mapper.
 * Extends the carousel item with `createdAt` for cross-repo sorting.
 * All fields are strings — empty string is the default for missing data.
 */
export type LobbyCarouselItemWithDate = ListingCardCarouselItem & {
  createdAt: string;
};
