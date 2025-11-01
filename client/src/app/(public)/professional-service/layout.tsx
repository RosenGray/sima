import type { Metadata } from "next";
import { ProfessionalServiceLayoutSection } from "./layout.styles";
import { Box } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Профессиональные услуги",
  description: "Профессиональные услуги",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ProfessionalServiceProvider data={{ professionalServices: [] }}>
    <ProfessionalServiceLayoutSection>
      {/* <Header /> */}
      <Box style={{ border: "1px solid red", height: "110px" }}>
        {/* PLACE HOLDER FOR IMAGE STRIPE */}
      </Box>
      <main>{children}</main>
    </ProfessionalServiceLayoutSection>
    // </ProfessionalServiceProvider>
  );
}
