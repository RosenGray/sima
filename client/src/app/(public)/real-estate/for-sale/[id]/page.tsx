import { FC } from "react";
import { realEstateForSaleRepository } from "@/lib/real-estate/for-sale/repository/RealEstateForSaleRepository";
import { notFound } from "next/navigation";
import RealEstateForSaleDetailClient from "../_components/RealEstateForSaleDetailClient/RealEstateForSaleDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_REAL_ESTATE_FOR_SALE } from "@/lib/constants/entityTypes";

interface RealEstateForSalePageProps {
  params: Promise<{ id: string }>;
}

const RealEstateForSalePage: FC<RealEstateForSalePageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const realEstate = await realEstateForSaleRepository.getByPublicId(id);
  if (!realEstate) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(realEstate.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_REAL_ESTATE_FOR_SALE, realEstate.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_REAL_ESTATE_FOR_SALE, realEstate.publicId);
  }
  return <RealEstateForSaleDetailClient realEstate={realEstate} viewCount={viewCount} />;
};

export default RealEstateForSalePage;
