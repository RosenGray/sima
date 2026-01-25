import { FC } from "react";
import { notFound } from "next/navigation";
import { Heading } from "@radix-ui/themes";
import { FormMode } from "@/components/Form/types/form.types";
import CommercialRealEstatePublishForm from "@/app/(private)/publish-ad/_components/real-estate/CommercialRealEstatePublishForm/CommercialRealEstatePublishForm";
import { commercialRealEstateRepository } from "@/lib/real-estate/commercial-real-estate/repository/CommercialRealEstateRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { Box } from "@radix-ui/themes";

interface EditCommercialRealEstatePageProps {
  params: Promise<{ id: string }>;
}

const EditCommercialRealEstatePage: FC<
  EditCommercialRealEstatePageProps
> = async ({ params }) => {
  const { id } = await params;
  const commercialRealEstate =
    await commercialRealEstateRepository.getByPublicId(id);

  if (!commercialRealEstate) {
    return notFound();
  }

  const isOwner = await thisUserIsOwner(commercialRealEstate.user.id);
  if (!isOwner) {
    return notFound();
  }

  return (
    <Box p={{ initial: "4", md: "6" }}>
      <Heading mb="4" align="center">
        Редактирование объявления
      </Heading>
      <CommercialRealEstatePublishForm
        commercialRealEstate={commercialRealEstate}
        formMode={FormMode.Edit}
      />
    </Box>
  );
};

export default EditCommercialRealEstatePage;
