"use client";

import SelectSingle from "@/components/Form/SelectSingle/SelectSingle";
import { createProfessional } from "@/lib/professionals/actions/login";
import { ProfessionalSchema } from "@/lib/professionals/types/professionals.scema";
import { Districts } from "@/lib/cities/types/cities.schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Box, Grid } from "@radix-ui/themes";
import { useActionState } from "react";

const ProfessionalsPublishForm = () => {
  const [formState, formAction] = useActionState(createProfessional, undefined);
  const [form, fields] = useForm({
    defaultValue: {
      images: [],
      district: Districts.Center,
    },
    lastResult: formState,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: ProfessionalSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onInput",
  });

  const {
    category,
    subCategory,
    district,
    city,
    description,
    images,
    email,
    phoneNumber,
    areaCode,
    acceptTerms,
  } = fields;
  return (
    <>
      <form action="">
        <Box>
          <Grid columns="2" gap="4" mb="4">
            sss
            {/* <SelectSingle
                    label="Выберите доску"
                    field={category}
                    placeholder="Выберите доску"
                    options={categoriesOptions}
                    defaultValue={categoriesOptions[0]}
                    errors={category.errors}
                    isDisabled={pending || isRevalidating}
                  /> */}
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default ProfessionalsPublishForm;
