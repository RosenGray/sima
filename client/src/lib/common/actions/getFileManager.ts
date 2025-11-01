'use server';

import { FileManager } from "@sima-board/common/build/fileManager";

export async function getFileManager() {
  return new FileManager({
    bucketName: process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME,
    endpoint: process.env.NEXT_PUBLIC_BACKBLAZEB_ENDPOINT,
    region: process.env.NEXT_PUBLIC_BACKBLAZEB_REGION,
    accessKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY,
    secretKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY,
    baseUrl: process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL,
  });
}