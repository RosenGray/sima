import { config } from "../config";

const { BACKBLAZEB_BASE_URL, BACKBLAZEB_PUBLIC_BUCKET_NAME } = config;

console.log('config inside utils outside/common/index.ts',BACKBLAZEB_PUBLIC_BUCKET_NAME)
 
export const generateBackblazeUrl = (folder: string, fileName: string) => {
  console.log('config inside utils inside/common/index.ts',BACKBLAZEB_PUBLIC_BUCKET_NAME)
  return `${BACKBLAZEB_BASE_URL}/${BACKBLAZEB_PUBLIC_BUCKET_NAME}/${folder}/${fileName}`;
};
