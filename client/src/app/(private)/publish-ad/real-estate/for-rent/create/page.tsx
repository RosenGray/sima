import { Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import RealEstateForRentPublishForm from "@/app/(private)/publish-ad/_components/real-estate/RealEstateForRentPublishForm/RealEstateForRentPublishForm";
import { Box } from "@radix-ui/themes";

const CreateRealEstateForRentPage: FC = async () => {
  return (
    <Box p={{ initial: "4", md: "6" }}>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <RealEstateForRentPublishForm formMode={FormMode.Create} />
    </Box>
  );
};

export default CreateRealEstateForRentPage;
