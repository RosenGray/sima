import { FC } from "react";
import { realEstateForRentRepository } from "@/lib/real-estate/for-rent/repository/RealEstateForRentRepository";
import { notFound } from "next/navigation";
import RealEstateForRentDetailClient from "../_components/RealEstateForRentDetailClient/RealEstateForRentDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_REAL_ESTATE_FOR_RENT } from "@/lib/constants/entityTypes";

interface RealEstateForRentPageProps {
  params: Promise<{ id: string }>;
}

const RealEstateForRentPage: FC<RealEstateForRentPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const realEstate = await realEstateForRentRepository.getByPublicId(id);
  if (!realEstate) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(realEstate.user.id);
  const viewCount = await getAdViewCount(ENTITY_TYPE_REAL_ESTATE_FOR_RENT, realEstate.publicId);
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_REAL_ESTATE_FOR_RENT, realEstate.publicId);
  }
  return <RealEstateForRentDetailClient realEstate={realEstate} viewCount={viewCount} />;
};

export default RealEstateForRentPage;
