import type { Metadata } from "next";
import Image from "next/image";
import {
  ProfessionalServiceLayoutSection,
  ProfessionalServiceLayoutStripe,
} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";

export const metadata: Metadata = {
  title: "Профессиональные услуги",
  description: "Профессиональные услуги",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripeSrc = generateBackblazeUrl("public", "professionals-stripe.jpeg");

  return (
    <ProfessionalServiceLayoutSection>
      <SimpleHeader />
      <ProfessionalServiceLayoutStripe>
        <Image
          src={stripeSrc}
          alt="Профессиональные услуги"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover", objectPosition: "0 35%" }}
        />
      </ProfessionalServiceLayoutStripe>
      <main>{children}</main>
    </ProfessionalServiceLayoutSection>
  );
}
