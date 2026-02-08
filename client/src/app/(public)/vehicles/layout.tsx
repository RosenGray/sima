import type { Metadata } from "next";
import { VehiclesLayoutSection } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";
import SectionStripe from "@/components/SectionStripe/SectionStripe";

export const metadata: Metadata = {
  title: "Транспорт",
  description: "Объявления о транспорте",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripeSrc = generateBackblazeUrl("public", "vehicles.png");

  return (
    <VehiclesLayoutSection>
      <Header />
      <SectionStripe
        src={stripeSrc}
        alt="Транспорт"
        objectPosition="0 45%"
      />
      <main>{children}</main>
    </VehiclesLayoutSection>
  );
}

