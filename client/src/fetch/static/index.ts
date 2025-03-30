import { config } from "@/utils/config";

const { API_URL } = config;

/**
 * This is a static fetch function that is used to fetch data from the server.
 * it should not use cookies, in order to be used in static pages
 */

interface CustomFetchSuccess<T> extends Response {
  ok: true;
  json: () => Promise<T>;
}

interface CustomFetchError<E> extends Response {
  ok: false;
  json: () => Promise<E>;
}

type CustomFetchResponse<T, E> = CustomFetchSuccess<T> | CustomFetchError<E>;

export const staticFetch = async <T, E>(
  endpoint: string,
  options: RequestInit = {}
): Promise<CustomFetchResponse<T, E>> => {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  });
  if (response.ok) {
    return response as CustomFetchResponse<T, E>;
  } else {
    return response as CustomFetchResponse<T, E>;
  }
};
