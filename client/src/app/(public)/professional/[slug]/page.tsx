import { FC } from "react";
import { professionalPageRepository } from "@/lib/professionals/professional-page/repository/ProfessionalPageRepository";
import { notFound } from "next/navigation";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_PROFESSIONAL_PAGE } from "@/lib/constants/entityTypes";
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

  const isOwner = await thisUserIsOwner(page.user.id);
  const editHref = `${process.env.NEXT_PUBLIC_CLIENT_URL ?? ""}/publish-ad/professional-page/edit/${page.publicId}`;
  const viewCount = await getAdViewCount(ENTITY_TYPE_PROFESSIONAL_PAGE, page.publicId);
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_PROFESSIONAL_PAGE, page.publicId);
  }

  return (
    <ProfessionalPageView
      page={page}
      isOwner={isOwner}
      editHref={editHref}
      viewCount={viewCount}
    />
  );
};

export default ProfessionalPage;
