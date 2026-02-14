import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { notFound } from "next/navigation";
import { professionalPageRepository } from "@/lib/professionals/professional-page/repository/ProfessionalPageRepository";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import PublishProfessionalServiceAdProvider from "@/app/(private)/publish-ad/_providers/PublishProfessionalServiceAdProvider";
import ProfessionalPageEditForm from "../_components/ProfessionalPageEditForm/ProfessionalPageEditForm";

interface ProfessionalEditPageProps {
  params: Promise<{ id: string }>;
}

const ProfessionalEditPage: FC<ProfessionalEditPageProps> = async ({
  params,
}) => {
  const { id: publicId } = await params;
  const [page, user] = await Promise.all([
    professionalPageRepository.getByPublicId(publicId),
    getCurrentUser(),
  ]);

  if (!page || !user || page.user.id !== user.id) {
    notFound();
  }

  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();

  return (
    <PublishProfessionalServiceAdProvider data={{ mappedCategories }}>
      <Box mx="auto" py="4">
        <Heading mb="4" align="center">
        Редактирование страницы
        </Heading>
        <ProfessionalPageEditForm page={page} />
      </Box>
    </PublishProfessionalServiceAdProvider>
  );
};

export default ProfessionalEditPage;
