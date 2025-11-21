import type { Metadata } from "next";
import {
  VehiclesLayoutSection,
  VehiclesLayoutStripe,
} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";

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
      <SimpleHeader />
      <VehiclesLayoutStripe $src={filePath} />
      <main>{children}</main>
    </VehiclesLayoutSection>
  );
}

