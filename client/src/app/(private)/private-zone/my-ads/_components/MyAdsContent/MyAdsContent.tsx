import { FC, Suspense } from "react";
import { IdCardIcon } from "@radix-ui/react-icons";
import type { MyAdSummary } from "@/lib/likes/entityTypeToPath";
import type { MyAdsStatusFilter } from "@/lib/my-ads/actions/getMyAds";
import {
  PageWrapper,
  PageTitle,
  AdList,
  EmptyState,
  EmptyStateText,
} from "@/app/(private)/private-zone/my-ads/my-ads.styles";
import MyAdsStatusTabs from "../MyAdsStatusTabs/MyAdsStatusTabs";
import MyAdListItem from "../MyAdListItem/MyAdListItem";

interface MyAdsContentProps {
  ads: MyAdSummary[];
  currentStatus: MyAdsStatusFilter;
}

const MyAdsContent: FC<MyAdsContentProps> = ({ ads, currentStatus }) => {
  return (
    <PageWrapper>
      <PageTitle as="h1">Мои объявления</PageTitle>

      <Suspense fallback={null}>
        <MyAdsStatusTabs currentStatus={currentStatus} />
      </Suspense>

      {ads.length === 0 ? (
        <EmptyState>
          <IdCardIcon width={32} height={32} />
          <EmptyStateText>
            {currentStatus === "all"
              ? "У вас пока нет объявлений"
              : `Нет объявлений со статусом «${currentStatus === "active" ? "Активные" : currentStatus === "expired" ? "Истёкшие" : currentStatus === "archived" ? "В архиве" : "Все"}»`}
          </EmptyStateText>
        </EmptyState>
      ) : (
        <AdList>
          {ads.map((ad) => (
            <MyAdListItem key={`${ad.entityType}-${ad.publicId}`} ad={ad} />
          ))}
        </AdList>
      )}
    </PageWrapper>
  );
};

export default MyAdsContent;
