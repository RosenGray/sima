import Link from "next/link";
import ProfessionalServiceCard from "./_components/ProfessionalServiceCard";
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
        {dummyServices.map((service, index) => (
          <Link href={`/professional-service/${service.publicId}`} key={index}>
            <ProfessionalServiceCard service={service} />
          </Link>
        ))}
      </ProfessionalsServicesGrid>
    </ProfessionalsPageContainer>
  );
};

export default ProfessionalsPage;
