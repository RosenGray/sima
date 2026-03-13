import { FC } from "react";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";
import { PageWrapper, PageTitle, TwoColumnLayout, LeftColumn, RightColumn } from "./page.styles";
import ChatNotificationCard from "./_components/ChatNotificationCard/ChatNotificationCard";
import StatsSummary from "./_components/StatsSummary/StatsSummary";
import GeneralDataSection from "./_components/GeneralDataSection/GeneralDataSection";

const StatisticsPage: FC = async () => {
  await requireAuthOrRedirectTo("/auth/login");

  return (
    <PageWrapper>
      <PageTitle as="h1">Статистика</PageTitle>
      <TwoColumnLayout>
        <LeftColumn>
          <ChatNotificationCard />
        </LeftColumn>
        <RightColumn>
          <StatsSummary />
          <GeneralDataSection />
        </RightColumn>
      </TwoColumnLayout>
    </PageWrapper>
  );
};

export default StatisticsPage;
