import type { Metadata } from "next";
import { PetsLayoutSection } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";
import SectionStripe from "@/components/SectionStripe/SectionStripe";

export const metadata: Metadata = {
  title: "Домашние животные",
  description: "Объявления о домашних животных",
};

export default function PetsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripeSrc = generateBackblazeUrl("public", "pets.png");
  console.log("stripeSrc", stripeSrc);

  return (
    <PetsLayoutSection>
      <Header />
      <SectionStripe
        src={stripeSrc}
        alt="Домашние животные"
        objectPosition="0 35%"
      />
      <main>{children}</main>
    </PetsLayoutSection>
  );
}
