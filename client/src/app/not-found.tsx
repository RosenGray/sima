import React from "react";
import Link from "next/link";
import { Container, Heading, Text, Button, Box, Flex, Theme, IconButton } from "@radix-ui/themes";
import GoBackButton from "@/components/buttons/GoBackButton/GoBackButton";
import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import styles from "./page.module.scss";

const NotFound = () => {
  return (
    <Box className={styles.NotFound}>
      <Container>
        <Flex
          direction="column"
          align="center"
          className={styles.NotFound__content}
        >
          <Heading
            color="yellow"
            as="h1"
            className={styles.NotFound__errorCode}
          >
            404
          </Heading>

          <Heading as="h2" size="6" mb="2">
            <span className={styles.NotFound__firstLineContainer}>
              Страница не найдена!

              <IconButton className={styles.NotFound__magnifyingGlassIcon} color="yellow" variant="surface">
  <MagnifyingGlassIcon width={35} height={35} />
</IconButton>


            </span>
            Вы попали на эту страницу по ошибке?
          </Heading>

          <Text as="p" size="3" color="gray" mb="5">
            Мы не смогли найти страницу, которую вы ищете. Возможно, страница
            была удалена, переименована или временно недоступна.
          </Text>

          <Flex gap="4" className={styles.buttons}>
            <GoBackButton color="yellow" />
            <Link href="/">
              <Button color="yellow" size="3" variant="surface">
                <HomeIcon width="18" height="18" />
                Home Page
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default NotFound;
