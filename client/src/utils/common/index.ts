import { config } from "../config";

const { BACKBLAZEB_BASE_URL, BACKBLAZEB_PUBLIC_BUCKET_NAME } = config;

export const generateBackblazeUrl = (folder: string, fileName: string) => {
  return `${BACKBLAZEB_BASE_URL}/${BACKBLAZEB_PUBLIC_BUCKET_NAME}/${folder}/${fileName}`;
};

// const bucketName = process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME;
// const baseUrl = process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL;

// export const generateBackblazeUrl = (folder: string, fileName: string) => {
//   return `${baseUrl}/${bucketName}/${folder}/${fileName}`;
// };
