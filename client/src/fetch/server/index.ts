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
  const cookies = nextCookies();
  const sessionCookie = cookies.get("sima-session");
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(sessionCookie
        ? { Cookie: `sima-session=${sessionCookie.value}` }
        : {}),
    },
  });
  if (response.ok) {
    return response as CustomFetchResponse<T, E>;
  } else {
    return response as CustomFetchResponse<T, E>;
  }
};
