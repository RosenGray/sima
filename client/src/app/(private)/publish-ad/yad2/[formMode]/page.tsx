import { Heading } from "@radix-ui/themes";
import { PublishAdYad2PageContainer } from "./page.styles";
import { FC } from "react";
import { FormMode, FormModeSchema } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import Yad2ItemPublishForm from "../../_components/yad2/Yad2ItemPublishForm/Yad2ItemPublishForm";

interface PublishAdYad2PageProps {
  params: Promise<{ formMode: string }>;
}

const PublishAdYad2Page: FC<PublishAdYad2PageProps> = async ({ params }) => {
  const { formMode } = await params;

  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || formMode === FormMode.Edit)
    return notFound();

  return (
    <PublishAdYad2PageContainer>
      <Heading mb="4" align="center">
        Добавление нового объявления
      </Heading>
      <Yad2ItemPublishForm formMode={FormMode.Create} />
    </PublishAdYad2PageContainer>
  );
};

export default PublishAdYad2Page;
