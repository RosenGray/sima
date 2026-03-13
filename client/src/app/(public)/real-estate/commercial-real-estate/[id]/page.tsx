import { FC } from "react";
import { commercialRealEstateRepository } from "@/lib/real-estate/commercial-real-estate/repository/CommercialRealEstateRepository";
import { notFound } from "next/navigation";
import CommercialRealEstateDetailClient from "../_components/CommercialRealEstateDetailClient/CommercialRealEstateDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_COMMERCIAL_REAL_ESTATE } from "@/lib/constants/entityTypes";

interface CommercialRealEstatePageProps {
  params: Promise<{ id: string }>;
}

const CommercialRealEstatePage: FC<CommercialRealEstatePageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const commercialRealEstate = await commercialRealEstateRepository.getByPublicId(id);
  if (!commercialRealEstate) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(commercialRealEstate.user.id);
  const viewCount = await getAdViewCount(ENTITY_TYPE_COMMERCIAL_REAL_ESTATE, commercialRealEstate.publicId);
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_COMMERCIAL_REAL_ESTATE, commercialRealEstate.publicId);
  }
  return (
    <CommercialRealEstateDetailClient
      commercialRealEstate={commercialRealEstate}
      viewCount={viewCount}
    />
  );
};

export default CommercialRealEstatePage;
