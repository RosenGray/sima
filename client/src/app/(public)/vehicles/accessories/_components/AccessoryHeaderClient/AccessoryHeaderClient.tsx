"use client";

import { FC, useCallback } from "react";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { ListBulletIcon, ViewGridIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Header, Title } from "../../page.styles";

interface AccessoryHeaderClientProps {
  totalCount: number;
}

const AccessoryHeaderClient: FC<AccessoryHeaderClientProps> = ({
  totalCount,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentView = searchParams.get("view") === "list" ? "list" : "grid";

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
        <Title size="5">Аксессуары и звук</Title>
        <Text as="p" size="2" color="gray">
          {totalCount} результатов найдено
        </Text>
      </Box>

      <Flex gap="1" align="center">
        <IconButton
          size="2"
          variant={currentView === "list" ? "soft" : "ghost"}
          color={currentView === "list" ? "accent" : "gray"}
          onClick={() => handleViewChange("list")}
          aria-label="Список"
          aria-pressed={currentView === "list"}
        >
          <ListBulletIcon width={18} height={18} />
        </IconButton>
        <IconButton
          size="2"
          variant={currentView === "grid" ? "soft" : "ghost"}
          color={currentView === "grid" ? "accent" : "gray"}
          onClick={() => handleViewChange("grid")}
          aria-label="Сетка"
          aria-pressed={currentView === "grid"}
        >
          <ViewGridIcon width={18} height={18} />
        </IconButton>
      </Flex>
    </Header>
  );
};

export default AccessoryHeaderClient;
