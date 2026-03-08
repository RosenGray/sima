export const RATE_LIMIT_ACTION_PUBLISH_HOUR = "publish-ad-hour";
export const RATE_LIMIT_ACTION_PUBLISH_DAY = "publish-ad-day";
export const RATE_LIMIT_ACTION_MESSAGE_NOTIFICATION = "message-notification";

export type RateLimitAction =
  | typeof RATE_LIMIT_ACTION_PUBLISH_HOUR
  | typeof RATE_LIMIT_ACTION_PUBLISH_DAY
  | typeof RATE_LIMIT_ACTION_MESSAGE_NOTIFICATION;

export const PUBLISH_LIMITS = {
  free: { hour: 1, day: 2 },
  // free: { hour: 5, day: 15 },
  // dealer: { hour: 30, day: 150 }, // future
} as const;
