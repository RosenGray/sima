import { Heading } from "@radix-ui/themes";
import { PublishAdProfessionalPageContainer } from "../page.styles";
import ProfessionalPagePublishForm from "../../_components/ProfessionalPagePublishForm/ProfessionalPagePublishForm";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import PublishProfessionalServiceAdProvider from "../../_providers/PublishProfessionalServiceAdProvider";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";

const CreateProfessionalPage: FC = async () => {
  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();

  return (
    <PublishProfessionalServiceAdProvider data={{ mappedCategories }}>
      <PublishAdProfessionalPageContainer>
        <Heading mb="4" align="center">
          Создание персональной страницы
        </Heading>
        <ProfessionalPagePublishForm formMode={FormMode.Create} />
      </PublishAdProfessionalPageContainer>
    </PublishProfessionalServiceAdProvider>
  );
};

export default CreateProfessionalPage;
