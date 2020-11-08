import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

export interface OAuth1Info extends OAuth1KeyToken, OAuth1Secret {
}

interface OAuth1KeyToken {
  consumerKey: string;
  token: string;
}

interface OAuth1Secret {
  consumerSecret: string;
  tokenSecret: string;
}

function fixedEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}
const createNonce = () => v4.generate().replace(/-/g, "");
const getNowTimestamp = () => Math.floor(Date.now() / 1000);

/**
 * Get paramater string.
 * https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature
 * @export
 * @param {OAuth1KeyToken} auth
 * @param {string} nonce
 * @param {number} timestamp
 * @param {URLSearchParams} [params]
 * @return {string} paramater string 
 */
export function getParamaterString(
  auth: OAuth1KeyToken,
  nonce: string,
  timestamp: number,
  params?: URLSearchParams,
) {
  const sp = new URLSearchParams(params);

  sp.append("oauth_consumer_key", auth.consumerKey);
  sp.append("oauth_nonce", nonce);
  sp.append("oauth_signature_method", "HMAC-SHA1");
  sp.append("oauth_timestamp", timestamp.toString()); //Math.floor(Date.now() / 1000).toString()
  sp.append("oauth_token", auth.token);
  sp.append("oauth_version", "1.0");
  sp.sort();

  const paramAry = [];
  for (const kv of sp.entries()) {
    paramAry.push(kv.map((e) => fixedEncodeURIComponent(e)).join("="));
  }
  return paramAry.join("&");
}

/**
 * Get signature base string.
 * https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature
 * @export
 * @param {string} method
 * @param {string} baseUrl
 * @param {string} paramaterString
 * @return {string} signature base string 
 */
export function getSignatureBaseString(
  method: string,
  baseUrl: string,
  paramaterString: string,
) {
  return [
    method.toUpperCase(),
    encodeURIComponent(baseUrl),
    encodeURIComponent(paramaterString),
  ].join("&");
}

/**
 * Get signing key.
 * https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature
 * @export
 * @param {OAuth1Secret} auth
 * @return {string} signing key 
 */
export function getSigningKey(auth: OAuth1Secret) {
  return [
    encodeURIComponent(auth.consumerSecret),
    encodeURIComponent(auth.tokenSecret),
  ].join("&");
}

/**
 * Calc signature
 * https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature
 * @export
 * @param {string} signatureBaseString
 * @param {string} signingKey
 * @return {string} signature 
 */
export function calcSignature(signatureBaseString: string, signingKey: string) {
  const signature = hmac(
    "sha1",
    signingKey,
    signatureBaseString,
    "utf8",
  ) as Uint8Array;
  return btoa(String.fromCharCode(...signature));
}

/**
 * Buildfing the header string.
 * https://developer.twitter.com/en/docs/authentication/oauth-1-0a/authorizing-a-request
 * @export
 * @param {OAuth1KeyToken} auth
 * @param {string} nonce
 * @param {string} signature
 * @param {number} timestamp
 * @return {string} header string 
 */
export function getHeaderAuthString(
  auth: OAuth1KeyToken,
  nonce: string,
  signature: string,
  timestamp: number,
) {
  const data = [
    ["oauth_consumer_key", auth.consumerKey],
    ["oauth_nonce", nonce],
    ["oauth_signature", signature],
    ["oauth_signature_method", "HMAC-SHA1"],
    ["oauth_timestamp", timestamp.toString()],
    ["oauth_token", auth.token],
    ["oauth_version", "1.0"],
  ];
  return "OAuth " +
    data.map((e) => `${encodeURIComponent(e[0])}="${encodeURIComponent(e[1])}"`)
      .join(", ");
}

export function getRequest(
  auth: OAuth1Info,
  input: string | Request | URL,
  init?: RequestInit,
  option?: { nonce?: string; timestamp?: number },
) {
  const request = new Request(input.toString(), init);
  //console.log(request.url);
  const url = new URL(request.url);
  const baseUrl = url.protocol + "//" + url.host + url.pathname;

  const nonce = option?.nonce || createNonce();
  const timestamp = option?.timestamp || getNowTimestamp();

  const paramaterString = getParamaterString(
    auth,
    nonce,
    timestamp,
    url.searchParams,
  );
  //console.log("paramaterString", paramaterString);
  const signatureBaseString = getSignatureBaseString(
    request.method,
    baseUrl,
    paramaterString,
  );
  const signingKey = getSigningKey(auth);
  const signature = calcSignature(signatureBaseString, signingKey);

  const headerAuthString = getHeaderAuthString(
    auth,
    nonce,
    signature,
    timestamp,
  );
  request.headers.set("Authorization", headerAuthString);
  console.log("url", request.url.toString());
  return request;
}

export async function oAuth1Fetch(
  auth: OAuth1Info,
  input: string | Request | URL,
  init?: RequestInit,
) {
  return fetch(getRequest(auth, input, init));
}
