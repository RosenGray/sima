import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { FormModeSchema } from "@/components/Form/types/form.types";
import { FormMode } from "@/components/Form/types/form.types";
import { notFound } from "next/navigation";
import { PublishAdYad2PageContainer } from "../page.styles";
import { yad2ItemRepository } from "@/lib/yad2/repository/Yad2ItemRepository";
import { thisUserIsOwner } from "@/lib/auth/utils/auth.utils";
import Yad2ItemPublishForm from "@/app/(private)/publish-ad/_components/yad2/Yad2ItemPublishForm/Yad2ItemPublishForm";

interface EditPublishAdYad2PageProps {
  params: Promise<{ formMode: string; id: string }>;
}

const EditPublishAdYad2Page: FC<EditPublishAdYad2PageProps> = async ({
  params,
}) => {
  const { formMode, id } = await params;
  const isCreateMode = formMode === FormMode.Create;

  //validate with schema
  const validatedParams = FormModeSchema.safeParse(formMode);
  if (!validatedParams.success || isCreateMode) return notFound();

  //get yad2 item
  const yad2Item = await yad2ItemRepository.getByPublicId(id);
  if (!yad2Item) return notFound();
  const isOwner = await thisUserIsOwner(yad2Item.user.id);
  if (!isOwner) return notFound();

  return (
    <PublishAdYad2PageContainer>
      <Box mx="auto">
        <Heading mb="4" align="center">
          Редактирование объявления
        </Heading>
        <Yad2ItemPublishForm yad2Item={yad2Item} formMode={FormMode.Edit} />
      </Box>
    </PublishAdYad2PageContainer>
  );
};

export default EditPublishAdYad2Page;
