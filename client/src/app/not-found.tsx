import React from "react";
import Link from "next/link";
import {

  Heading,
  Text,
  Button,

  Flex,

} from "@radix-ui/themes";
// import GoBackButton from "@/components/buttons/GoBackButton/GoBackButton";
import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  NotFoundContainer,
  NotFoundContent,
  NotFoundErrorCode,
  NotFoundFirstLineContainer,
  NotFoundMagnifyingGlassIcon,
} from "./not-found.styles";
import GoBackButton from "@/components/buttons/GoBackButton/GoBackButton";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <Flex direction="column" align="center">
          <NotFoundErrorCode color="yellow" as="h1">
            404
          </NotFoundErrorCode>

          <Heading as="h2" size="6" mb="2">
            <NotFoundFirstLineContainer as="p">
              Страница не найдена!
              <NotFoundMagnifyingGlassIcon color="yellow" variant="surface">
                <MagnifyingGlassIcon width={35} height={35} />
              </NotFoundMagnifyingGlassIcon>
            </NotFoundFirstLineContainer>
            Вы попали на эту страницу по ошибке?
          </Heading>

          <Text as="p" size="3" color="gray" mb="5">
            Мы не смогли найти страницу, которую вы ищете. Возможно, страница
            была удалена, переименована или временно недоступна.
          </Text>

          <Flex justify="center" gap="16px">
            <GoBackButton color="yellow" />
            <Link href="/">
              <Button color="yellow" size="3" variant="surface">
                <HomeIcon width="18" height="18" />
                Home Page
              </Button>
            </Link>
          </Flex>
        </Flex>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;
