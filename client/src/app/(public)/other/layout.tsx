import type { Metadata } from "next";
import { OtherLayoutSection, OtherLayoutStripe } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";

export const metadata: Metadata = {
  title: "Другое",
  description: "Разные объявления и предложения",
};

export default function OtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = generateBackblazeUrl("public", "other-stripe-placeholder.jpeg");

  return (
    <OtherLayoutSection>
      <SimpleHeader />
      <OtherLayoutStripe $src={filePath} />
      <main>{children}</main>
    </OtherLayoutSection>
  );
}
