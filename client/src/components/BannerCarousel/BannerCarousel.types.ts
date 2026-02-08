export interface BannerSlideItem {
  href: string;
  imageDesktop: string;
  imageMobile?: string;
  label?: string;
  /** Russian text for the slide CTA button (e.g. "Все машины"). Omit to hide button. */
  buttonLabel?: string;
}

export type AutoplayConfig =
  | boolean
  | {
      delay?: number;
      disableOnInteraction?: boolean;
      enabled?: boolean;
    };

export interface BannerCarouselProps {
  items: BannerSlideItem[];
  autoplay?: AutoplayConfig;
  loop?: boolean;
  className?: string;
  ariaLabel?: string;
  /** When true, show the CTA button on slides that have buttonLabel. Default true. */
  showButton?: boolean;
  "data-nagish"?: string;
}
