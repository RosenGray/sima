import { Box, Card, Container, Heading } from "@radix-ui/themes";
import { ProfessionalsPublishForm } from "./_components/ProfessionalsPublishForm/ProfessionalsPublishForm";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getServiceCategoriesMapping } from "./_lib/actions";
import { getQueryClient } from "@/app/get-query-client";
import classes from "./page.module.scss";

const PublishAdProfessionalsPage = () => {
  const queryClient = getQueryClient();
  queryClient.fetchQuery({
    queryKey: ["serviceCategoriesMapping"],
    queryFn: getServiceCategoriesMapping,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return (
    <Container className={classes.PublishAdProfessionalsPage__Container}>
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
