import { FC } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";
import { getLastSearches } from "@/lib/last-search/actions/lastSearch.actions";
import {
  PageWrapper,
  PageTitle,
  SearchList,
  EmptyState,
  EmptyStateText,
} from "./last-searches.styles";
import LastSearchItem from "./_components/LastSearchItem/LastSearchItem";

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
            <LastSearchItem key={search.id} search={search} />
          ))}
        </SearchList>
      )}
    </PageWrapper>
  );
};

export default LastSearchesPage;
