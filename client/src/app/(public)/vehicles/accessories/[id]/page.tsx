import { FC } from "react";
import { accessoryRepository } from "@/lib/vehicles/accessories/repository/AccessoryRepository";
import { notFound } from "next/navigation";
import AccessoryDetailClient from "../_components/AccessoryDetailClient/AccessoryDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_VEHICLES_ACCESSORIES } from "@/lib/constants/entityTypes";

interface AccessoryPageProps {
  params: Promise<{ id: string }>;
}

const AccessoryPage: FC<AccessoryPageProps> = async ({ params }) => {
  const { id } = await params;
  const accessory = await accessoryRepository.getByPublicId(id);
  if (!accessory) {
    return notFound();
  }
  const isOwner = await thisUserIsOwner(accessory.user.id);
  const viewCount = await getAdViewCount(ENTITY_TYPE_VEHICLES_ACCESSORIES, accessory.publicId);
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_VEHICLES_ACCESSORIES, accessory.publicId);
  }
  return <AccessoryDetailClient accessory={accessory} viewCount={viewCount} />;
};

export default AccessoryPage;
