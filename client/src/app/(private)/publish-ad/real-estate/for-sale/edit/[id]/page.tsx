import { FC } from "react";
import { notFound } from "next/navigation";
import { Heading } from "@radix-ui/themes";
import { FormMode } from "@/components/Form/types/form.types";
import RealEstateForSalePublishForm from "@/app/(private)/publish-ad/_components/real-estate/RealEstateForSalePublishForm/RealEstateForSalePublishForm";
import { realEstateForSaleRepository } from "@/lib/real-estate/for-sale/repository/RealEstateForSaleRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { Box } from "@radix-ui/themes";

interface EditRealEstateForSalePageProps {
  params: Promise<{ id: string }>;
}

const EditRealEstateForSalePage: FC<EditRealEstateForSalePageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const realEstate = await realEstateForSaleRepository.getByPublicId(id);

  if (!realEstate) {
    return notFound();
  }

  const isOwner = await thisUserIsOwner(realEstate.user.id);
  if (!isOwner) {
    return notFound();
  }

  return (
    <Box p={{ initial: "4", md: "6" }}>
      <Heading mb="4" align="center">
        Редактирование объявления
      </Heading>
      <RealEstateForSalePublishForm
        realEstate={realEstate}
        formMode={FormMode.Edit}
      />
    </Box>
  );
};

export default EditRealEstateForSalePage;
