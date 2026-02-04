import type { Metadata } from "next";
import { ProfessionalServiceLayoutSection } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";
import SectionStripe from "@/components/SectionStripe/SectionStripe";

export const metadata: Metadata = {
  title: "Профессиональные услуги",
  description: "Профессиональные услуги",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripeSrc = generateBackblazeUrl("public", "professional-service.png");

  return (
    <ProfessionalServiceLayoutSection>
      <SimpleHeader />
      <SectionStripe
        src={stripeSrc}
        alt="Профессиональные услуги"
        objectPosition="0 10%"
      />
      <main>{children}</main>
    </ProfessionalServiceLayoutSection>
  );
}
