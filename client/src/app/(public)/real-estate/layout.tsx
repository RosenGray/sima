import type { Metadata } from "next";
import {
  RealEstateLayoutSection,
  RealEstateLayoutStripe,
} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";

export const metadata: Metadata = {
  title: "Недвижимость",
  description: "Объявления о недвижимости",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = generateBackblazeUrl("public", "real-estate-stripe-placeholder.jpeg");

  return (
    <RealEstateLayoutSection>
      <SimpleHeader />
      <RealEstateLayoutStripe $src={filePath} />
      <main>{children}</main>
    </RealEstateLayoutSection>
  );
}
