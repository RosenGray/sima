"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { ListBulletIcon, ViewGridIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Header, Title } from "../../page.styles";
import DialogPrimitiveOnMobileStickyButton from "@/components/modals/DialogPrimitiveOnMobileStickyButton/DialogPrimitiveOnMobileStickyButton";
import SortFilters, { SortOption } from "@/components/SortFilters/SortFilters";

interface PetForFreeHeaderClientProps {
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

const PetForFreeHeaderClient: FC<PetForFreeHeaderClientProps> = ({
  totalCount,
  initialSort,
  sortOptions,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentView = searchParams.get("view") === "list" ? "list" : "grid";

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

  const handleViewChange = useCallback(
    (nextView: "list" | "grid") => {
      const params = new URLSearchParams(searchParams);
      params.set("view", nextView);
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <Header>
      <Box>
        <Title size="5">Питомцы отдают бесплатно</Title>
        <Text as="p" size="2" color="gray">
          {totalCount} результатов найдено
        </Text>
      </Box>

      <Flex gap="2" align="center" wrap="wrap">
        <Flex gap="1" align="center">
          <IconButton
            size="2"
            variant={currentView === "list" ? "soft" : "ghost"}
            color={currentView === "list" ? "blue" : "gray"}
            onClick={() => handleViewChange("list")}
            aria-label="Список"
            aria-pressed={currentView === "list"}
          >
            <ListBulletIcon width={18} height={18} />
          </IconButton>
          <IconButton
            size="2"
            variant={currentView === "grid" ? "soft" : "ghost"}
            color={currentView === "grid" ? "blue" : "gray"}
            onClick={() => handleViewChange("grid")}
            aria-label="Сетка"
            aria-pressed={currentView === "grid"}
          >
            <ViewGridIcon width={18} height={18} />
          </IconButton>
        </Flex>
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
      </Flex>
    </Header>
  );
};

export default PetForFreeHeaderClient;
