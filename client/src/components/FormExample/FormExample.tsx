"use client";
import { useFormState, useFormStatus } from "react-dom";
import { formActionHandler } from "./externalFileForActionsExample";
import { useActionState, useState } from "react";
const handleImageExample = (image: File) => {
  const extension = image.name.split(".");
  const fileName =
    "some random / unique element to each file name, maybe with slug and .extensio";
  console.log(extension);
};

const SubmitForm = () => {
  //USE form status has to be inside a client component and inside a form element
  const status = useFormStatus();
  // const m = useActionState(); from
  // const b = useFormState(); from nextjs 14
  console.log(status);
  return <button type="submit">submit</button>;
};

const FormExample = () => {
  const [s,useS] = useState(1);
  // const formActionHandler = async (formData:FormData) => {
  //   'use server'
  //   const image = formData.get('image') as File;
  //   console.log(image)
  //   handleImageExample(image);
  // }

  return (
    <div>

      <fieldset>
        <legend>Choices</legend>
        <form action={formActionHandler}>
          <input type="text" name="id" />
          <input type="email" name="email" />
          <textarea name="description" id=""></textarea>
          <input type="file" name="image" />
          <SubmitForm/>
        </form>
      </fieldset>
    </div>
  );
};

export default FormExample;
