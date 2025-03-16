import { Box, Card, Container, Heading } from "@radix-ui/themes";
import { ProfessionalsPublishForm } from "./_components/ProfessionalsPublishForm/ProfessionalsPublishForm";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getProfessionals, getServiceCategoriesMapping } from "./_lib/actions";
import { getQueryClient } from "@/app/get-query-client";
import classes from "./page.module.scss";
import Link from "next/link";

const PublishAdProfessionalsPage = () => {
  const queryClient = getQueryClient();
  queryClient.fetchQuery({
    queryKey: ["serviceCategoriesMapping"],
    queryFn: getServiceCategoriesMapping,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
  queryClient.fetchQuery({
    queryKey: ["getProfessionals"],
    queryFn: getProfessionals,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return (
    <Container className={classes.PublishAdProfessionalsPage__Container}>
      <Link href="/professionals/all">Professionals</Link>
      <Box>
        <Heading mb="4" align="center">
          Добавление нового объявления
        </Heading>
        <Card className={classes.PublishAdProfessionalsPage__Card}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProfessionalsPublishForm />
          </HydrationBoundary>
        </Card>
      </Box>
    </Container>
  );
};

export default PublishAdProfessionalsPage;
