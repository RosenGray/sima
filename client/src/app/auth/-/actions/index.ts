"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "../validations";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

// Define the form state type

const REGION = "eu-central-003";
const BUCKET_NAME = "sima-board-public";
const ACCESS_KEY = "0034fe6951b6db40000000001";
const SECRET_KEY = "K003AJsZXPlQTgmQfXz2KEQJXeCXcvs";

const s3Client = new S3Client({
  region: REGION,
  endpoint: "https://s3.eu-central-003.backblazeb2.com", // Backblaze S3 endpoint
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});


export const createUser = async (
  prevState: unknown,
  formData: FormData
) => {
  console.log("form data:", formData.get("firstName"));
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });
  console.log('submission',submission)
const m = submission.reply();
  // if (submission.status !== "success") {
  //   return {
  //     ...state,
  //     ...submission.reply(),
  //     // firstName: state.firstName,
  //     // email: state.email
  //   };
  // }
  if (submission.status !== 'success') {
    return submission.reply();
  }

  //some auth staff
  console.log("auth user");
  // return redirect("/about");
};
//https://f003.backblazeb2.com/file/sima-board-public-dev/sima/sima.dark.logo.png
//https://f003.backblazeb2.com/file/sima-board-public/bla/test.jpg
const generatePublicUrl = (bucketName:string, folderName:string, fileName:string) => {
  return `https://f003.backblazeb2.com/file/${bucketName}/${folderName}/${fileName}`;
};


export const handleImage = async (formData:FormData) => {
  const image = formData.get('image') as File;
  // Convert the File to a Buffer
  const buffer = Buffer.from(await image.arrayBuffer());
    // // Define the folder name
    const folderName = "bla"; // Replace with your desired folder name
    const fileName = image.name;
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${folderName}/${fileName}`, // File name in the bucket
    Body: buffer,
    ContentType: image.type,
  };

  // const params = {
  //   Bucket: BUCKET_NAME,
  //   Key: "bla/", // Key ending with '/'
  //   Body: "", // Zero-byte content
  // };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("Upload success:", data);
    return data;
  } catch (err) {
    console.error("Error uploading file:", err);
  }
}


  