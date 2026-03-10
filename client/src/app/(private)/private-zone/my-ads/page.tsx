import { FC } from "react";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";
import { getMyAds, type MyAdsStatusFilter } from "@/lib/my-ads/actions/getMyAds";
import MyAdsContent from "./_components/MyAdsContent/MyAdsContent";

const VALID_STATUS: MyAdsStatusFilter[] = ["active", "expired", "archived", "all"];

interface MyAdsPageProps {
  searchParams?: Promise<{ status?: string }>;
}

const MyAdsPage: FC<MyAdsPageProps> = async (props) => {
  await requireAuthOrRedirectTo("/auth/login");

  const searchParams = await props.searchParams;
  const statusParam = searchParams?.status;
  const currentStatus: MyAdsStatusFilter =
    statusParam && VALID_STATUS.includes(statusParam as MyAdsStatusFilter)
      ? (statusParam as MyAdsStatusFilter)
      : "active";

  const ads = await getMyAds(currentStatus);

  return <MyAdsContent ads={ads} currentStatus={currentStatus} />;
};

export default MyAdsPage;
