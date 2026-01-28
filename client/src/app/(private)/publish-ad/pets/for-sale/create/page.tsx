import { Heading } from "@radix-ui/themes";
import { PublishAdPetsPageContainer } from "./page.styles";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import PetForSalePublishForm from "@/app/(private)/publish-ad/_components/pets/PetForSalePublishForm/PetForSalePublishForm";

const CreatePetForSalePage: FC = async () => {
  return (
    <PublishAdPetsPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <PetForSalePublishForm formMode={FormMode.Create} />
    </PublishAdPetsPageContainer>
  );
};

export default CreatePetForSalePage;
