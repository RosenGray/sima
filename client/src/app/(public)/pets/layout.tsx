import type { Metadata } from "next";
import {
  PetsLayoutSection,
  PetsLayoutStripe,
} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";

export const metadata: Metadata = {
  title: "Домашние животные",
  description: "Объявления о домашних животных",
};

export default function PetsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = generateBackblazeUrl(
    "public",
    "pets-stripe-placeholder.jpeg"
  );

  return (
    <PetsLayoutSection>
      <Header />
      <PetsLayoutStripe $src={filePath} />
      <main>{children}</main>
    </PetsLayoutSection>
  );
}
