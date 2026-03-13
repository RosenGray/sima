import { FC } from "react";
import { othersRepository } from "@/lib/other/repository/OthersRepository";
import { notFound } from "next/navigation";
import OthersDetailClient from "../_components/OthersDetailClient/OthersDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_OTHER } from "@/lib/constants/entityTypes";

interface OtherPageProps {
  params: Promise<{ id: string }>;
}

const OtherPage: FC<OtherPageProps> = async ({ params }) => {
  const { id } = await params;
  const others = await othersRepository.getByPublicId(id);
  if (!others) {
    notFound();
  }
  const isOwner = await thisUserIsOwner(others.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_OTHER, others.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_OTHER, others.publicId);
  }
  return <OthersDetailClient others={others} viewCount={viewCount} />;
};

export default OtherPage;
