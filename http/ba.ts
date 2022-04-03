import { Base64 } from "https://deno.land/x/bb64@1.1.0/mod.ts";

export interface BasicAuthInfo {
  username: string;
  password: string;
}

const getBa = (auth: BasicAuthInfo): string =>
  `Basic ${Base64.fromString(`${auth.username}:${auth.password}`).toString()}`;

interface BaFetch {
  (
    input: string | Request,
    auth: BasicAuthInfo,
    init?: RequestInit | undefined,
  ): Promise<Response>;
  /** @deprecated
   * URL is deprecated as the first argument. Use string or Request object instead.
   */
  (
    input: URL,
    auth: BasicAuthInfo,
    init?: RequestInit | undefined,
  ): Promise<Response>;
}

/**
 * Fetch with basic auth
 */
export const baFetch: BaFetch = (input, auth, init?) => {
  const headers: HeadersInit = new Headers(init?.headers);
  headers.append("Authorization", getBa(auth));

  if (input instanceof URL) return fetch(input, { ...init, headers: headers });
  else return fetch(input, { ...init, headers: headers });
};
