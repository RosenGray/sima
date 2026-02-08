import type { Metadata } from "next";
import { JobsLayoutSection, JobsLayoutStripe } from "./layout.styles";
import { generateBackblazeUrl } from "@/utils/common";
import Header from "@/components/Header/Header/Header";

export const metadata: Metadata = {
  title: "Работа",
  description: "Предложения работы и вакансии",
};

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filePath = generateBackblazeUrl("public", "jobs-stripe-placeholder.jpeg");

  return (
    <JobsLayoutSection>
      <Header />
      <JobsLayoutStripe $src={filePath} />
      <main>{children}</main>
    </JobsLayoutSection>
  );
}
