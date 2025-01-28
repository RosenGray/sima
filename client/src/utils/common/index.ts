import { config } from "../config";

const { BACKBLAZEB_BASE_URL, BACKBLAZEB_PUBLIC_BUCKET_NAME } = config;

export const generateBackblazeUrl = (folder: string, fileName: string) => {
  return `${BACKBLAZEB_BASE_URL}/${BACKBLAZEB_PUBLIC_BUCKET_NAME}/${folder}/${fileName}`;
};
