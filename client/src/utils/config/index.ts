interface Config {
  BACKBLAZEB_BASE_URL: string;
  BACKBLAZEB_ENDPOINT: string;
  BACKBLAZEB_REGION: string;
  BACKBLAZEB_PUBLIC_BUCKET_NAME: string;
  BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY: string;
  BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY: string;
  RADIX_THEME_APP_ID:string;
  RADIX_THEME_PORTAL_ID:string;
  API_URL:string;
}

const getConfig = (
  key: string,
  defaultValue: string | undefined = undefined
): string => {
  const value = process.env[key];
  return value || defaultValue || "";
};



export const config: Config = {
  BACKBLAZEB_BASE_URL: getConfig(
    "NEXT_PUBLIC_BACKBLAZEB_BASE_URL",
    "https://f003.backblazeb2.com/file"
  ),
  BACKBLAZEB_ENDPOINT: getConfig(
    "NEXT_PUBLIC_BACKBLAZEB_ENDPOINT",
    "https://s3.eu-central-003.backblazeb2.com"
  ),
  BACKBLAZEB_REGION: getConfig("NEXT_PUBLIC_BACKBLAZEB_REGION", "eu-central-003"),
  BACKBLAZEB_PUBLIC_BUCKET_NAME: getConfig(
    "NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME",
    "sima-board-public-dev"
  ),
  BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY: getConfig(
    "BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY",
    process.env.BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY
  ),
  BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY: getConfig(
    "BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY",
    process.env.BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY
  ),
  RADIX_THEME_APP_ID : "radix-themes-app",
  RADIX_THEME_PORTAL_ID : "radix-themes-portal",
  API_URL: getConfig("API_URL", process.env.NEXT_PUBLIC_API_URL)
};

console.log(111111)
console.log('NEXT_PUBLIC_BACKBLAZEB_BASE_URL',process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL)