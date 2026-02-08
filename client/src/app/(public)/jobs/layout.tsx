import type { Metadata } from "next";
import { JobsLayoutSection } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";
import SectionStripe from "@/components/SectionStripe/SectionStripe";

export const metadata: Metadata = {
  title: "Работа",
  description: "Предложения работы и вакансии",
};

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stripeSrc = generateBackblazeUrl("public", "jobs.png");

  return (
    <JobsLayoutSection>
      <Header />
      <SectionStripe
        src={stripeSrc}
        alt="Работа"
        objectPosition="0 15%"
      />
      <main>{children}</main>
    </JobsLayoutSection>
  );
}
