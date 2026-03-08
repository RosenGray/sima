import { FC } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";
import { getLastSearches } from "@/lib/last-search/actions/lastSearch.actions";
import {
  PageWrapper,
  PageTitle,
  SearchList,
  SearchCardLink,
  SearchInfo,
  SearchTitle,
  SearchDate,
  EmptyState,
  EmptyStateText,
} from "./last-searches.styles";

function formatDate(date: Date | undefined): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

const LastSearchesPage: FC = async () => {
  await requireAuthOrRedirectTo("/auth/login");
  const searches = await getLastSearches();

  return (
    <PageWrapper>
      <PageTitle as="h1">Мои последние поиски</PageTitle>

      {searches.length === 0 ? (
        <EmptyState>
          <MagnifyingGlassIcon width={32} height={32} />
          <EmptyStateText>У вас ещё нет сохранённых поисков</EmptyStateText>
        </EmptyState>
      ) : (
        <SearchList>
          {searches.map((search) => (
            <SearchCardLink key={search.searchParamsHash} href={search.url}>
              <Image
                src={search.thumbnail}
                alt={search.title}
                width={48}
                height={48}
                style={{ borderRadius: "var(--radius-2)", objectFit: "cover" }}
              />
              <SearchInfo>
                <SearchTitle as="span">{search.title}</SearchTitle>
                <SearchDate as="span">{formatDate(search.updatedAt)}</SearchDate>
              </SearchInfo>
            </SearchCardLink>
          ))}
        </SearchList>
      )}
    </PageWrapper>
  );
};

export default LastSearchesPage;
