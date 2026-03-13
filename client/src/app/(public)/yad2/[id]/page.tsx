import { FC } from "react";
import { yad2ItemRepository } from "@/lib/yad2/repository/Yad2ItemRepository";
import { notFound } from "next/navigation";
import Yad2ItemDetailClient from "../_components/Yad2ItemDetailClient/Yad2ItemDetailClient";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { getAdViewCount, recordAdView } from "@/lib/views/actions/views.actions";
import { ENTITY_TYPE_YAD2 } from "@/lib/constants/entityTypes";

interface Yad2ItemPageProps {
  params: Promise<{ id: string }>;
}

const Yad2ItemPage: FC<Yad2ItemPageProps> = async ({ params }) => {
  const { id } = await params;
  const yad2Item = await yad2ItemRepository.getByPublicId(id);
  if (!yad2Item) {
    notFound();
  }
  const isOwner = await thisUserIsOwner(yad2Item.user.id);
  const viewCount = isOwner
    ? await getAdViewCount(ENTITY_TYPE_YAD2, yad2Item.publicId)
    : null;
  if (!isOwner) {
    await recordAdView(ENTITY_TYPE_YAD2, yad2Item.publicId);
  }
  return <Yad2ItemDetailClient yad2Item={yad2Item} viewCount={viewCount} />;
};

export default Yad2ItemPage;
