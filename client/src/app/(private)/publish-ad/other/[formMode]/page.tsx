import { Heading } from "@radix-ui/themes";
import { PublishAdOtherPageContainer } from "./page.styles";
import OthersPublishForm from "../../_components/other/OthersPublishForm/OthersPublishForm";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";

interface PublishAdOtherPageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdOtherPage: FC<PublishAdOtherPageProps> = async ({ params }) => {
  const { formMode } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success) return notFound();

  if (formMode === FormMode.Edit) {
    return notFound();
  }

  return (
    <PublishAdOtherPageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <OthersPublishForm formMode={FormMode.Create} />
    </PublishAdOtherPageContainer>
  );
};

export default PublishAdOtherPage;
