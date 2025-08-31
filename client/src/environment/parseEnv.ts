import { z } from 'zod';


const SimaEnvSchema = z.object({
    NEXT_PUBLIC_TEST: z.string(),
    NEXT_PUBLIC_ENV: z.enum(['local', 'dev', 'prod']),
    NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME: z.string(),
    NBACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY: z.string().default(''),
    BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY: z.string().default(''),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_CLIENT_URL: z.string(),
    NEXT_PUBLIC_RECAPTCHA_FRONTNED_SITE_KEY: z.string(),
    JWT_KEY: z.string(),
    DB_USERNAME: z.string().default(''),
    DB_PASSWORD: z.string().default(''),
});

 type SimaEnv = z.infer<typeof SimaEnvSchema>;
 const parseSimaEnv = () => SimaEnvSchema.parse(process.env);


console.log(123)
export {parseSimaEnv};
export type {SimaEnv};


// NEXT_PUBLIC_BACKBLAZEB_BASE_URL=https://f003.backblazeb2.com/file
// NEXT_PUBLIC_BACKBLAZEB_ENDPOINT=https://s3.eu-central-003.backblazeb2.com
// NEXT_PUBLIC_BACKBLAZEB_REGION=eu-central-003




// NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME=sima-board-public-dev
// NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY=0034fe6951b6db40000000002
// NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY=K0036g2enG1kfyS+ch1PZu4a+ApRQDk
// NEXT_PUBLIC_API_URL=http://sima.dev
// NEXT_PUBLIC_CLIENT_URL=http://sima.dev
// JWT_KEY=RosenGray
// NEXT_PUBLIC_FOO=bar
// NEXT_PUBLIC_RECAPTCHA_FRONTNED_SITE_KEY=6LeXDtMqAAAAAMaIbBjfVOvvn-LSDq0Pf7lj9tHZ


// //prod


// NEXT_PUBLIC_BACKBLAZEB_BASE_URL=https://f003.backblazeb2.com/file
// NEXT_PUBLIC_BACKBLAZEB_ENDPOINT=https://s3.eu-central-003.backblazeb2.com
// NEXT_PUBLIC_BACKBLAZEB_REGION=eu-central-003
// NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME=sima-board-public
// NEXT_PUBLIC_API_URL=https://www.sima-board.com
// NEXT_PUBLIC_CLIENT_URL=https://www.sima-board.com
// NEXT_PUBLIC_FOO=bar
// NEXT_PUBLIC_RECAPTCHA_FRONTNED_SITE_KEY=6LeXDtMqAAAAAMaIbBjfVOvvn-LSDq0Pf7lj9tHZ



