import { FC } from "react";
import { professionalPageRepository } from "@/lib/professionals/professional-page/repository/ProfessionalPageRepository";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import ProfessionalPageView from "../_components/ProfessionalPageView/ProfessionalPageView";

interface ProfessionalPageProps {
  params: Promise<{ slug: string }>;
}

const ProfessionalPage: FC<ProfessionalPageProps> = async ({ params }) => {
  const { slug } = await params;
  const [page, currentUser] = await Promise.all([
    professionalPageRepository.getBySlug(slug),
    getCurrentUser(),
  ]);

  if (!page || !page.isPublished) {
    notFound();
  }

  const isOwner = !!currentUser && currentUser.id === page.user.id;
  const editHref = `${process.env.NEXT_PUBLIC_CLIENT_URL ?? ""}/professional/edit/${page.publicId}`;

  return (
    <ProfessionalPageView
      page={page}
      isOwner={isOwner}
      editHref={editHref}
    />
  );
};

export default ProfessionalPage;
