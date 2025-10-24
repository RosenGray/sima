import { ProfessionalServiceCards } from "./_components/ProfessionalServiceCards/ProfessionalServiceCard";
import {
  ProfessionalsPageContainer,
  ProfessionalsServicesGrid,
  Title,
} from "./page.styles";

const ProfessionalsPage = () => {

  return (
    <ProfessionalsPageContainer>
      <Title align="center">Профессиональные услуги</Title>
      <ProfessionalsServicesGrid
        gap="3"
        columns={{
          xs: "1",
          sm: "2",
        }}
        width="auto"
      >
        <ProfessionalServiceCards />
      </ProfessionalsServicesGrid>
    </ProfessionalsPageContainer>
  );
};

export default ProfessionalsPage;
