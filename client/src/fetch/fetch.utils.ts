import { customFetch as customFetchServer } from "@/fetch/server";
import { customFetch as customFetchClient } from "@/fetch/client";

const getApiClient = () => {
  const isClient = typeof window !== "undefined";
  if (isClient) {
    return customFetchClient;
  }
  return customFetchServer;
};

export const fetchClient = getApiClient();
