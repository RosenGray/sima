import type { Metadata } from "next";
import {
  Yad2LayoutSection,
  Yad2LayoutStripe,
} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";

export const metadata: Metadata = {
  title: "Б/у товары",
  description: "Объявления о б/у товарах",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = generateBackblazeUrl("public", "yad2-stripe-placeholder.jpeg");

  return (
    <Yad2LayoutSection>
      <SimpleHeader />
      <Yad2LayoutStripe $src={filePath} />
      <main>{children}</main>
    </Yad2LayoutSection>
  );
}
