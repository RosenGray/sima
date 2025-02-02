import { Box, Card, Container, Heading } from "@radix-ui/themes";

import classes from "./page.module.scss";
import { ProfessionalsPublishForm } from "./_components/ProfessionalsPublishForm/ProfessionalsPublishForm";

const PublishAdProfessionalsPage = () => {
  return (
    <Container className={classes.PublishAdProfessionalsPage__Container}>
      <Box>
        <Heading mb="4" align="center">
          Добавление нового объявления
        </Heading>
        <Card  className={classes.PublishAdProfessionalsPage__Card}>
          <ProfessionalsPublishForm />
        </Card>
      </Box>
    </Container>
  );
};

export default PublishAdProfessionalsPage;
