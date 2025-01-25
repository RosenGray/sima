"use server";
import { cookies as nextCookies } from "next/headers";
import { config } from "@/utils/config";

const { API_URL } = config;

interface CustomFetchSuccess<T> extends Response {
  ok: true;
  json: () => Promise<T>;
}

interface CustomFetchError<E> extends Response {
  ok: false;
  json: () => Promise<E>;
}

type CustomFetchResponse<T, E> = CustomFetchSuccess<T> | CustomFetchError<E>;

export const customFetch = async <T, E>(
  endpoint: string,
  options: RequestInit = {}
): Promise<CustomFetchResponse<T, E>> => {
  const sessionCookie = nextCookies().get("sima-auth-session");
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Cookie: `sima-auth-session=${sessionCookie?.value}`,
      ...options.headers,
    },
  });
  if (response.ok) {
    return response as CustomFetchResponse<T, E>;
  } else {
    return response as CustomFetchResponse<T, E>;
  }
};
