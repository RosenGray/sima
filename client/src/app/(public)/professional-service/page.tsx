import { ProfessionalServiceCards } from "./_components/ProfessionalServiceCards/ProfessionalServiceCard";
import { generateDummyProfessionalServices } from "./_components/dummyData";
import {
  ProfessionalsPageContainer,
  ProfessionalsServicesGrid,
  Title,
} from "./page.styles";

const ProfessionalsPage = () => {
  const dummyServices = generateDummyProfessionalServices(20);

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
