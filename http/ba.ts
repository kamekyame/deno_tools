import { Base64 } from "https://deno.land/x/bb64/mod.ts";

export interface BasicAuth {
  username: string;
  password: string;
}

const getBa = (auth: BasicAuth): string =>
  `Basic ${Base64.fromString(`${auth.username}:${auth.password}`).toString()}`;

/**
 * Fetch with basic auth
 *
 * @export
 * @param {(string | Request | URL)} input
 * @param {BasicAuth} auth
 * @param {(RequestInit | undefined)} [init]
 * @return {Promise<Response>}
 */
export function baFetch(
  input: string | Request | URL,
  auth: BasicAuth,
  init?: RequestInit | undefined,
): Promise<Response> {
  const headers: HeadersInit = new Headers(init?.headers);
  headers.append("Authorization", getBa(auth));

  return fetch(input, { ...init, headers: headers });
}
