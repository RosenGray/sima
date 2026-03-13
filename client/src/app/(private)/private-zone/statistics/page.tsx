import { FC } from "react";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";
import { getMyAds } from "@/lib/my-ads/actions/getMyAds";
import { viewsRepository } from "@/lib/views/repository/ViewsRepository";
import { getTotalLikeCountForAds } from "@/lib/likes/repository/LikesRepository";
import { phoneRevealsRepository } from "@/lib/phone-reveals/repository/PhoneRevealsRepository";
import { PageWrapper, PageTitle, TwoColumnLayout, LeftColumn, RightColumn } from "./page.styles";
import ChatNotificationCard from "./_components/ChatNotificationCard/ChatNotificationCard";
import StatsSummary from "./_components/StatsSummary/StatsSummary";
import GeneralDataSection from "./_components/GeneralDataSection/GeneralDataSection";

const StatisticsPage: FC = async () => {
  await requireAuthOrRedirectTo("/auth/login");

  const allAds = await getMyAds("all");
  const adPairs = allAds.map(ad => ({
    entityType: ad.entityType,
    entityPublicId: ad.publicId,
  }));

  const [views, likes, phoneClicks] = await Promise.all([
    viewsRepository.getTotalCountForAds(adPairs),
    getTotalLikeCountForAds(adPairs),
    phoneRevealsRepository.getTotalCountForAds(adPairs),
  ]);

  return (
    <PageWrapper>
      <PageTitle as="h1">Статистика</PageTitle>
      <TwoColumnLayout>
        <LeftColumn>
          <ChatNotificationCard />
        </LeftColumn>
        <RightColumn>
          <StatsSummary />
          <GeneralDataSection views={views} likes={likes} phoneClicks={phoneClicks} />
        </RightColumn>
      </TwoColumnLayout>
    </PageWrapper>
  );
};

export default StatisticsPage;
