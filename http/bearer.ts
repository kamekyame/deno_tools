/** Fetch with bearer auth */
export function bearerFetch(
  input: string | Request | URL,
  bearerToken: string,
  init?: RequestInit | undefined,
): Promise<Response> {
  const headers: HeadersInit = new Headers(init?.headers);
  headers.append("Authorization", `Bearer ${bearerToken}`);

  return fetch(input, { ...init, headers: headers });
}
