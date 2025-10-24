import { Suspense } from "react";
import { ProfessionalServiceCards } from "./_components/ProfessionalServiceCards/ProfessionalServiceCard";
import {
  ProfessionalsPageContainer,
  ProfessionalsServicesGrid,
  Title,
} from "./page.styles";
import Dummy from "@/components/Dummy/Dummy";

const ProfessionalsPage = async () => {

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
        {/* <ProfessionalServiceCards /> */}
      <Suspense fallback={<div>Loading...</div>}>
          <Dummy />
        </Suspense>
      </ProfessionalsServicesGrid>
    </ProfessionalsPageContainer>
  );
}

export default ProfessionalsPage;
