"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { Box, Text } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Header, Title } from "../../page.styles";
import DialogPrimitiveOnMobileStickyButton from "@/components/modals/DialogPrimitiveOnMobileStickyButton/DialogPrimitiveOnMobileStickyButton";
import SortFilters, { SortOption } from "@/components/SortFilters/SortFilters";

interface PetAccessoryHeaderClientProps {
  totalCount: number;
  initialSort?: string;
  sortOptions: SortOption[];
}

const getSortTitle = (sort: string | undefined, sortOptions: SortOption[]) => {
  if (!sort) return "Сортировка";

  const [field, direction] = sort.split("_");
  const option = sortOptions.find((o) => o.field === field);

  if (!option) return "Сортировка";

  if (direction === "asc") {
    return option.ascLabel || option.label;
  }

  if (direction === "desc") {
    return option.descLabel || option.label;
  }

  return option.label;
};

const PetAccessoryHeaderClient: FC<PetAccessoryHeaderClientProps> = ({
  totalCount,
  initialSort,
  sortOptions,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState(initialSort ?? "date_desc");

  const sortTitle = useMemo(
    () => getSortTitle(sort, sortOptions),
    [sort, sortOptions]
  );

  const handleSortChange = useCallback(
    (nextSort: string) => {
      setSort(nextSort);
      const params = new URLSearchParams(searchParams);
      params.set("sort", nextSort);
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <Header>
      <Box>
        <Title size="5">Аксессуары для питомцев</Title>
        <Text as="p" size="2" color="gray">
          {totalCount} результатов найдено
        </Text>
      </Box>

      <DialogPrimitiveOnMobileStickyButton
        buttonVariant="ghost"
        titleIsVisible={true}
        title={sortTitle}
        subtitle="Сортировка по"
        subtitleIsVisible={true}
        showOverlay={false}
      >
        <SortFilters
          currentSort={sort}
          sortOptions={sortOptions}
          onSortChange={handleSortChange}
        />
      </DialogPrimitiveOnMobileStickyButton>
    </Header>
  );
};

export default PetAccessoryHeaderClient;
