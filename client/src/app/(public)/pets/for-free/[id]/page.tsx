import { FC } from "react";
import { petForFreeRepository } from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { notFound } from "next/navigation";
import PetForFreeDetailClient from "../_components/PetForFreeDetailClient/PetForFreeDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_PETS_FOR_FREE } from "@/lib/constants/entityTypes";

interface PetForFreePageProps {
  params: Promise<{ id: string }>;
}

const PetForFreePage: FC<PetForFreePageProps> = async ({ params }) => {
  const { id } = await params;
  const pet = await petForFreeRepository.getByPublicId(id);
  if (!pet) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(pet.user.id);
  const viewCount = await getAdViewCount(ENTITY_TYPE_PETS_FOR_FREE, pet.publicId);
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_PETS_FOR_FREE, pet.publicId);
  }
  return <PetForFreeDetailClient pet={pet} viewCount={viewCount} />;
};

export default PetForFreePage;
