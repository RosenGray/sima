export const generateBackblazeUrl = (folder: string, fileName: string) => {
  return `${process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL}/${process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME}/${folder}/${fileName}`;
};
