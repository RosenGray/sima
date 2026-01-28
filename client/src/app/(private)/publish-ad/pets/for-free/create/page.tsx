import { Heading } from "@radix-ui/themes";
import { PublishAdPetsPageContainer } from "./page.styles";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import PetForFreePublishForm from "@/app/(private)/publish-ad/_components/pets/PetForFreePublishForm/PetForFreePublishForm";

const CreatePetForFreePage: FC = async () => {
  return (
    <PublishAdPetsPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <PetForFreePublishForm formMode={FormMode.Create} />
    </PublishAdPetsPageContainer>
  );
};

export default CreatePetForFreePage;
