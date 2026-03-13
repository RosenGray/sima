import { FC } from "react";
import { petAccessoryRepository } from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { notFound } from "next/navigation";
import PetAccessoryDetailClient from "../_components/PetAccessoryDetailClient/PetAccessoryDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_PETS_ACCESSORIES } from "@/lib/constants/entityTypes";

interface PetAccessoryPageProps {
  params: Promise<{ id: string }>;
}

const PetAccessoryPage: FC<PetAccessoryPageProps> = async ({ params }) => {
  const { id } = await params;
  const accessory = await petAccessoryRepository.getByPublicId(id);
  if (!accessory) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(accessory.user.id);
  const viewCount = await getAdViewCount(ENTITY_TYPE_PETS_ACCESSORIES, accessory.publicId);
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_PETS_ACCESSORIES, accessory.publicId);
  }
  return <PetAccessoryDetailClient accessory={accessory} viewCount={viewCount} />;
};

export default PetAccessoryPage;
