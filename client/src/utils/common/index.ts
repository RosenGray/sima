import { config } from "../config";

const { BACKBLAZEB_BASE_URL, BACKBLAZEB_PUBLIC_BUCKET_NAME } = config;

console.log('config inside utils/common/index.ts',config)

export const generateBackblazeUrl = (folder: string, fileName: string) => {
  return `${BACKBLAZEB_BASE_URL}/${BACKBLAZEB_PUBLIC_BUCKET_NAME}/${folder}/${fileName}`;
};
