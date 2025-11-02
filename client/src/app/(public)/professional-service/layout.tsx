import type { Metadata } from "next";
import {
  ProfessionalServiceLayoutSection,
  ProfessionalServiceLayoutStripe,
} from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";

export const metadata: Metadata = {
  title: "Профессиональные услуги",
  description: "Профессиональные услуги",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = generateBackblazeUrl("public", "professionals-stripe.jpeg");

  return (
    // <ProfessionalServiceProvider data={{ professionalServices: [] }}>
    <ProfessionalServiceLayoutSection>
      {/* <Header /> */}
      <ProfessionalServiceLayoutStripe
        $src={filePath}
      />

      <main>{children}</main>
    </ProfessionalServiceLayoutSection>
    // </ProfessionalServiceProvider>
  );
}
