import { Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormMode } from "@/components/Form/types/form.types";
import RealEstateForSalePublishForm from "@/app/(private)/publish-ad/_components/real-estate/RealEstateForSalePublishForm/RealEstateForSalePublishForm";
import { Box } from "@radix-ui/themes";

const CreateRealEstateForSalePage: FC = async () => {
  return (
    <Box p={{ initial: "4", md: "6" }}>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <RealEstateForSalePublishForm formMode={FormMode.Create} />
    </Box>
  );
};

export default CreateRealEstateForSalePage;
