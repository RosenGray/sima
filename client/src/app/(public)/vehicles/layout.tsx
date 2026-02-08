import type { Metadata } from "next";
import {
  VehiclesLayoutSection,
  VehiclesLayoutStripe,
} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";

export const metadata: Metadata = {
  title: "Транспорт",
  description: "Объявления о транспорте",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = generateBackblazeUrl("public", "vehicles-stripe-placeholder.jpeg");

  return (
    <VehiclesLayoutSection>
      <Header />
      <VehiclesLayoutStripe $src={filePath} />
      <main>{children}</main>
    </VehiclesLayoutSection>
  );
}

