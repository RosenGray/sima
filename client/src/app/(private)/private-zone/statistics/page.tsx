import { FC } from "react";
import { requireAuthOrRedirectTo, getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { getMyAds } from "@/lib/my-ads/actions/getMyAds";
import { viewsRepository } from "@/lib/views/repository/ViewsRepository";
import { getTotalLikeCountForAds } from "@/lib/likes/repository/LikesRepository";
import { phoneRevealsRepository } from "@/lib/phone-reveals/repository/PhoneRevealsRepository";
import { chatRepository } from "@/lib/chat/repository/ChatRepository";
import { PageWrapper, PageTitle, TwoColumnLayout, LeftColumn, RightColumn } from "./page.styles";
import ChatNotificationCard from "./_components/ChatNotificationCard/ChatNotificationCard";
import StatsSummary from "./_components/StatsSummary/StatsSummary";
import GeneralDataSection from "./_components/GeneralDataSection/GeneralDataSection";

const StatisticsPage: FC = async () => {
  await requireAuthOrRedirectTo("/auth/login");

  const [allAds, user] = await Promise.all([getMyAds("all"), getCurrentUser()]);
  const adPairs = allAds.map(ad => ({
    entityType: ad.entityType,
    entityPublicId: ad.publicId,
  }));

  const [views, likes, phoneClicks, chatCount] = await Promise.all([
    viewsRepository.getTotalCountForAds(adPairs),
    getTotalLikeCountForAds(adPairs),
    phoneRevealsRepository.getTotalCountForAds(adPairs),
    user ? chatRepository.getConversationCountForUser(user.id) : Promise.resolve(0),
  ]);
  

  return (
    <PageWrapper>
      <PageTitle as="h1">Статистика</PageTitle>
      <TwoColumnLayout>
        <LeftColumn>
          <ChatNotificationCard count={chatCount} />
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
