import { FC } from "react";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";
import { getLikedAdSummaries } from "@/lib/likes/actions/getLikedAdSummaries";
import LikedAdsContent from "./_components/LikedAdsContent/LikedAdsContent";

const LikedAdsPage: FC = async () => {
  await requireAuthOrRedirectTo("/auth/login");

  const ads = await getLikedAdSummaries();

  return <LikedAdsContent ads={ads} />;
};

export default LikedAdsPage;
