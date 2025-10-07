import ProfessionalServiceCard from "./_components/ProfessionalServiceCard";
import { generateDummyProfessionalServices } from "./_components/dummyData";
import {
  ProfessionalsPageContainer,
  ProfessionalsServicesGrid,
  Title,
} from "./page.styles";

console.log(1);

const ProfessionalsPage = () => {
  const dummyServices = generateDummyProfessionalServices();

  return (
    <ProfessionalsPageContainer>
      <Title align="center">Профессиональные услуги</Title>
      <ProfessionalsServicesGrid
        gap="3"
        columns={{
          xs: "1",
          sm: "2",
          md: "3",
        }}
        width="auto"
      >
        {dummyServices.map((service, index) => (
          <ProfessionalServiceCard key={index} service={service} />
        ))}
      </ProfessionalsServicesGrid>
    </ProfessionalsPageContainer>
  );
};

export default ProfessionalsPage;
