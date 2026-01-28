import type { Metadata } from "next";
import {
  ProfessionalServiceLayoutSection,
  ProfessionalServiceLayoutStripe,
} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";

export const metadata: Metadata = {
  title: "Профессиональные услуги",
  description: "Профессиональные услуги",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = generateBackblazeUrl("public", "professionals-stripe.jpeg");

  return (
    <ProfessionalServiceLayoutSection>
      <SimpleHeader />
      <ProfessionalServiceLayoutStripe $src={filePath} />
      <main>{children}</main>
    </ProfessionalServiceLayoutSection>
  );
}
