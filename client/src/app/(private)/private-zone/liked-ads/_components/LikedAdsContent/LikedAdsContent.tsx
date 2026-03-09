import { FC } from "react";
import { HeartIcon } from "@radix-ui/react-icons";
import type { MyAdSummary } from "@/lib/likes/entityTypeToPath";
import {
  PageWrapper,
  PageTitle,
  AdList,
  EmptyState,
  EmptyStateText,
} from "@/app/(private)/private-zone/my-ads/my-ads.styles";
import LikedAdListItem from "../LikedAdListItem/LikedAdListItem";

interface LikedAdsContentProps {
  ads: MyAdSummary[];
}

const LikedAdsContent: FC<LikedAdsContentProps> = ({ ads }) => {
  return (
    <PageWrapper>
      <PageTitle as="h1">Избранные объявления</PageTitle>

      {ads.length === 0 ? (
        <EmptyState>
          <HeartIcon width={32} height={32} />
          <EmptyStateText>У вас пока нет избранных объявлений</EmptyStateText>
        </EmptyState>
      ) : (
        <AdList>
          {ads.map((ad) => (
            <LikedAdListItem key={`${ad.entityType}-${ad.publicId}`} ad={ad} />
          ))}
        </AdList>
      )}
    </PageWrapper>
  );
};

export default LikedAdsContent;
