"use server";
import { config } from "@/utils/config";

const { API_URL } = config;

export const customFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = `${API_URL}${endpoint}`;
  console.log("url", url);
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  return response;
};
