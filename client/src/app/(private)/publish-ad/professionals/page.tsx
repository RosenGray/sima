import { Box, Heading, Card } from "@radix-ui/themes";
import { PublishAdProfessionalsPageContainer } from "./page.styles";
import ProfessionalsPublishForm from "../_components/ProfessionalsPublishForm/ProfessionalsPublishForm";

const PublishAdProfessionalsPage = async () => {

  return (
    <PublishAdProfessionalsPageContainer>
      <Box>
        <Heading mb="4" align="center">
          Добавление нового объявления
        </Heading>
        <Card>
          <ProfessionalsPublishForm  />
        </Card>
      </Box>
    </PublishAdProfessionalsPageContainer>
  );
};

export default PublishAdProfessionalsPage;
