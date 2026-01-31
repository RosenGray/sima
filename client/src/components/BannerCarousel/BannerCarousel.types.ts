export interface BannerSlideItem {
  href: string;
  imageDesktop: string;
  imageMobile?: string;
  label?: string;
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
  "data-nagish"?: string;
}
