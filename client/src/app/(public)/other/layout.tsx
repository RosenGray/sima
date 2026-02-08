import type { Metadata } from "next";
import { OtherLayoutSection } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";
import SectionStripe from "@/components/SectionStripe/SectionStripe";

export const metadata: Metadata = {
  title: "Другое",
  description: "Разные объявления и предложения",
};

export default function OtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripeSrc = generateBackblazeUrl("public", "others.png");

  return (
    <OtherLayoutSection>
      <Header />
      <SectionStripe
        src={stripeSrc}
        alt="Другое"
        objectPosition="0 35%"
      />
      <main>{children}</main>
    </OtherLayoutSection>
  );
}
