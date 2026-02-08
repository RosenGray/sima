import type { Metadata } from "next";
import { ProfessionalServiceLayoutSection } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";
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
      <Header />
      <SectionStripe
        src={stripeSrc}
        alt="Профессиональные услуги"
        objectPosition="0 10%"
      />
      <main>{children}</main>
    </ProfessionalServiceLayoutSection>
  );
}
