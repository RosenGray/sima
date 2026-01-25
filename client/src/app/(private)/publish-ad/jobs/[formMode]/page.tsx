import { Heading } from "@radix-ui/themes";
import { PublishAdJobsPageContainer } from "./page.styles";
import JobPublishForm from "../../_components/jobs/JobPublishForm/JobPublishForm";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";

interface PublishAdJobsPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdJobsPage: FC<PublishAdJobsPageProps> = async ({ params }) => {
  const { formMode } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success) return notFound();

  if (formMode === FormMode.Edit) {
    return notFound();
  }

  return (
    <PublishAdJobsPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <JobPublishForm formMode={FormMode.Create} />
    </PublishAdJobsPageContainer>
  );
};

export default PublishAdJobsPage;
