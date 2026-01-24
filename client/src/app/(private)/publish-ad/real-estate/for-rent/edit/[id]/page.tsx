import { FC } from "react";
import { notFound } from "next/navigation";
import { Heading } from "@radix-ui/themes";
import { FormMode } from "@/components/Form/types/form.types";
import RealEstateForRentPublishForm from "@/app/(private)/publish-ad/_components/real-estate/RealEstateForRentPublishForm/RealEstateForRentPublishForm";
import { realEstateForRentRepository } from "@/lib/real-estate/for-rent/repository/RealEstateForRentRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { Box } from "@radix-ui/themes";

interface EditRealEstateForRentPageProps {
  params: Promise<{ id: string }>;
}

const EditRealEstateForRentPage: FC<EditRealEstateForRentPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const realEstate = await realEstateForRentRepository.getByPublicId(id);

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
      <RealEstateForRentPublishForm
        realEstate={realEstate}
        formMode={FormMode.Edit}
      />
    </Box>
  );
};

export default EditRealEstateForRentPage;
