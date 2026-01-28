import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { othersRepository } from "@/lib/other/repository/OthersRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import { Heading } from "@radix-ui/themes";
import { PublishAdOtherPageContainer } from "../page.styles";
import OthersPublishForm from "../../../_components/other/OthersPublishForm/OthersPublishForm";

interface PublishAdOtherEditPageProps {
  params: Promise<{ formMode: string; id: string }>;
}

const PublishAdOtherEditPage: FC<PublishAdOtherEditPageProps> = async ({
  params,
}) => {
  const { formMode, id } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success) return notFound();

  if (formMode === FormMode.Create) {
    return notFound();
  }

  const others = await othersRepository.getByPublicId(id);
  if (!others) {
    return notFound();
  }

  const isOwner = await thisUserIsOwner(others.user.id);
  if (!isOwner) {
    return notFound();
  }

  return (
    <PublishAdOtherPageContainer>
      <Heading mb="4" align="center">
        Редактирование объявления
      </Heading>
      <OthersPublishForm entity={others} formMode={FormMode.Edit} />
    </PublishAdOtherPageContainer>
  );
};

export default PublishAdOtherEditPage;
