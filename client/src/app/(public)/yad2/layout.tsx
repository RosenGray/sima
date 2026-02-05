import type { Metadata } from "next";
import {
  Yad2LayoutSection,

} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";
import SectionStripe from "@/components/SectionStripe/SectionStripe";

export const metadata: Metadata = {
  title: "Куплю-Продам товары",
  description: "Объявления о б/у и новых товарах",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripeSrc = generateBackblazeUrl("public", "yad2.png");

  return (
    <Yad2LayoutSection>
      <SimpleHeader />
      <SectionStripe
        src={stripeSrc}
        alt="Куплю-Продам товары"
        objectPosition="0 40%"
      />
      <main>{children}</main>
    </Yad2LayoutSection>
  );
}
