"use client";

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

  const url = `/${endpoint}`;
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
