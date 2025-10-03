import { Box, Heading, Card } from "@radix-ui/themes";
import { PublishAdProfessionalsPageContainer } from "./page.styles";
import ProfessionalServicePublishForm from "../_components/ProfessionalServicePublishForm/ProfessionalServicePublishForm";

const PublishAdProfessionalsPage = async () => {

  return (
    <PublishAdProfessionalsPageContainer>
      <Box>
        <Heading mb="4" align="center">
          Добавление нового объявления
        </Heading>
        <Card>
          <ProfessionalServicePublishForm  />
        </Card>
      </Box>
    </PublishAdProfessionalsPageContainer>
  );
};

export default PublishAdProfessionalsPage;
