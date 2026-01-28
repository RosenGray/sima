import { Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import CommercialRealEstatePublishForm from "@/app/(private)/publish-ad/_components/real-estate/CommercialRealEstatePublishForm/CommercialRealEstatePublishForm";
import { Box } from "@radix-ui/themes";

const CreateCommercialRealEstatePage: FC = async () => {
  return (
    <Box p={{ initial: "4", md: "6" }}>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <CommercialRealEstatePublishForm formMode={FormMode.Create} />
    </Box>
  );
};

export default CreateCommercialRealEstatePage;
