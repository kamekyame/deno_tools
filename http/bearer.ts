interface BearerFetch {
  (
    input: string | Request,
    bearerToken: string,
    init?: RequestInit | undefined,
  ): Promise<Response>;
  /** @deprecated
   * URL is deprecated as the first argument. Use string or Request object instead.
   */
  (
    input: URL,
    bearerToken: string,
    init?: RequestInit | undefined,
  ): Promise<Response>;
}

/** Fetch with bearer auth */
export const bearerFetch: BearerFetch = (input, bearerToken, init?) => {
  const headers: HeadersInit = new Headers(init?.headers);
  headers.append("Authorization", `Bearer ${bearerToken}`);

  if (input instanceof URL) return fetch(input, { ...init, headers: headers });
  else return fetch(input, { ...init, headers: headers });
};
