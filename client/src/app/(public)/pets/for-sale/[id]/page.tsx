import { FC } from "react";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { notFound } from "next/navigation";
import PetForSaleDetailClient from "../_components/PetForSaleDetailClient/PetForSaleDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_PETS_FOR_SALE } from "@/lib/constants/entityTypes";

interface PetForSalePageProps {
  params: Promise<{ id: string }>;
}

const PetForSalePage: FC<PetForSalePageProps> = async ({ params }) => {
  const { id } = await params;
  const pet = await petForSaleRepository.getByPublicId(id);
  if (!pet) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(pet.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_PETS_FOR_SALE, pet.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_PETS_FOR_SALE, pet.publicId);
  }
  return <PetForSaleDetailClient pet={pet} viewCount={viewCount} />;
};

export default PetForSalePage;
