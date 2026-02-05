import Image from "next/image";
import { SectionStripeContainer } from "./SectionStripe.styles";

export interface SectionStripeProps {
  /** Image URL (e.g. from generateBackblazeUrl) */
  src: string;
  /** Accessible alt text for the stripe image */
  alt: string;
  /** CSS object-position for the image (default "0 35%") */
  objectPosition?: string;
  /** Stripe height in pixels (default 270) */
  height?: number;
  /** Use priority loading for above-the-fold stripes (default true) */
  priority?: boolean;
}

const SectionStripe = ({
  src,
  alt,
  objectPosition = "0 35%",
  height = 270,
  priority = true,
}: SectionStripeProps) => {
  return (
    <SectionStripeContainer $height={height}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        style={{ objectFit: "cover", objectPosition }}
      />
    </SectionStripeContainer>
  );
};

export default SectionStripe;
