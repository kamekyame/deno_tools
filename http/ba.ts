import { Base64 } from "https://deno.land/x/bb64/mod.ts";

export interface BasicAuthInfo {
  username: string;
  password: string;
}

const getBa = (auth: BasicAuthInfo): string =>
  `Basic ${Base64.fromString(`${auth.username}:${auth.password}`).toString()}`;

/**
 * Fetch with basic auth
 *
 * @export
 * @param {(string | Request | URL)} input
 * @param {BasicAuthInfo} auth
 * @param {(RequestInit | undefined)} [init]
 * @return {Promise<Response>}
 */
export function baFetch(
  input: string | Request | URL,
  auth: BasicAuthInfo,
  init?: RequestInit | undefined,
): Promise<Response> {
  const headers: HeadersInit = new Headers(init?.headers);
  headers.append("Authorization", getBa(auth));

  return fetch(input, { ...init, headers: headers });
}
