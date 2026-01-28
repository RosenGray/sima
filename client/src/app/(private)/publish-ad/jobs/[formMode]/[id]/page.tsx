import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { jobRepository } from "@/lib/jobs/repository/JobRepository";
import JobPublishForm from "../../../_components/jobs/JobPublishForm/JobPublishForm";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { Heading } from "@radix-ui/themes";
import { PublishAdJobsPageContainer } from "../page.styles";

interface PublishAdJobsEditPageProps {
  params: Promise<{ formMode: string; id: string }>;
}

const PublishAdJobsEditPage: FC<PublishAdJobsEditPageProps> = async ({
  params,
}) => {
  const { formMode, id } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success) return notFound();

  if (formMode === FormMode.Create) {
    return notFound();
  }

  const job = await jobRepository.getByPublicId(id);
  if (!job) {
    return notFound();
  }

  const isOwner = await thisUserIsOwner(job.user.id);
  if (!isOwner) {
    return notFound();
  }

  return (
    <PublishAdJobsPageContainer>
      <Heading mb="4" align="center">
        Редактирование объявления
      </Heading>
      <JobPublishForm entity={job} formMode={FormMode.Edit} />
    </PublishAdJobsPageContainer>
  );
};

export default PublishAdJobsEditPage;
