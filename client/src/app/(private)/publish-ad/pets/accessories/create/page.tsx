import { Heading } from "@radix-ui/themes";
import { PublishAdPetsPageContainer } from "./page.styles";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import PetAccessoryPublishForm from "@/app/(private)/publish-ad/_components/pets/PetAccessoryPublishForm/PetAccessoryPublishForm";

const CreatePetAccessoryPage: FC = async () => {
  return (
    <PublishAdPetsPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <PetAccessoryPublishForm formMode={FormMode.Create} />
    </PublishAdPetsPageContainer>
  );
};

export default CreatePetAccessoryPage;
