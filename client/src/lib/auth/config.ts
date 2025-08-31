export const DEV_DOMAIN = "localhost"; // //.sima.dev//localhost
export const SESSION_CONFIG = {
  name: 'sima-session',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  domain: process.env.NODE_ENV === 'production' ? '.sima-board.com' :DEV_DOMAIN,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};
