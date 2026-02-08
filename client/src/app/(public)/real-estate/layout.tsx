import type { Metadata } from "next";
import { RealEstateLayoutSection } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";
import SectionStripe from "@/components/SectionStripe/SectionStripe";

export const metadata: Metadata = {
  title: "Недвижимость",
  description: "Объявления о недвижимости",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripeSrc = generateBackblazeUrl("public", "real-estate.png");

  return (
    <RealEstateLayoutSection>
      <Header />
      <SectionStripe
        src={stripeSrc}
        alt="Недвижимость"
        objectPosition="0 35%"
      />
      <main>{children}</main>
    </RealEstateLayoutSection>
  );
}
