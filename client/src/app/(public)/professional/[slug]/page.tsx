import { FC } from "react";
import { professionalPageRepository } from "@/lib/professionals/professional-page/repository/ProfessionalPageRepository";
import { notFound } from "next/navigation";
import ProfessionalPageView from "../_components/ProfessionalPageView/ProfessionalPageView";

interface ProfessionalPageProps {
  params: Promise<{ slug: string }>;
}

const ProfessionalPage: FC<ProfessionalPageProps> = async ({ params }) => {
  const { slug } = await params;
  const page = await professionalPageRepository.getBySlug(slug);

  if (!page || !page.isPublished) {
    notFound();
  }

  return <ProfessionalPageView page={page} />;
};

export default ProfessionalPage;
