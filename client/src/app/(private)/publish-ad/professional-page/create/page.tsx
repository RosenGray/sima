import { PublishAdProfessionalPageContainer } from "../page.styles";
import ProfessionalPagePublishForm from "../../_components/ProfessionalPagePublishForm/ProfessionalPagePublishForm";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import PublishProfessionalServiceAdProvider from "../../_providers/PublishProfessionalServiceAdProvider";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { professionalPageRepository } from "@/lib/professionals/professional-page/repository/ProfessionalPageRepository";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { notFound, redirect } from "next/navigation";

const CreateProfessionalPage: FC = async () => {
  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();
  const user = await getCurrentUser();
  if (!user) return notFound();
  const existingProfessionalPage = await professionalPageRepository.getByUserId(
    user.id,
  );
  if (existingProfessionalPage) {
    return redirect(
      `/publish-ad/professional-page/edit/${existingProfessionalPage.publicId}`,
    );
  }

  return (
    <PublishProfessionalServiceAdProvider data={{ mappedCategories }}>
      <PublishAdProfessionalPageContainer>
        <ProfessionalPagePublishForm formMode={FormMode.Create} />
      </PublishAdProfessionalPageContainer>
    </PublishProfessionalServiceAdProvider>
  );
};

export default CreateProfessionalPage;
