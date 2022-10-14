import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";

import {
  calcSignature,
  getHeaderAuthString,
  getParamaterString,
  getRequest,
  getSignatureBaseString,
  getSigningKey,
} from "./oauth1.ts";

const consumer_key = "xvz1evFS4wEEPTGEFPHBog";
const consumer_secret = "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw";
const token = "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb";
const token_secret = "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE";
const auth = {
  consumerKey: consumer_key,
  consumerSecret: consumer_secret,
  token: token,
  tokenSecret: token_secret,
};
const nonce = "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg";
const timestamp = 1318622958;

const method = "POST";
const baseUrl = "https://api.twitter.com/1.1/statuses/update.json";

const params = new URLSearchParams();
params.append("include_entities", "true");
params.append(
  "status",
  "Hello Ladies + Gentlemen, a signed OAuth request!",
);

const paramaterString = getParamaterString(
  /*{
    consumerKey: consumer_key,
    token: token,
  }*/ auth,
  nonce,
  timestamp,
  params,
);
const signatureBaseString = getSignatureBaseString(
  method,
  baseUrl,
  paramaterString,
);
const signingKey = getSigningKey(
  auth, //{ consumerSecret: consumer_secret, tokenSecret: token_secret },
);
const signature = calcSignature(signatureBaseString, signingKey);
const headerString = getHeaderAuthString(
  //consumer_key,
  auth, //token,
  nonce,
  signature,
  timestamp,
);

Deno.test("Collecting parameters", () => {
  const exampleString =
    "include_entities=true&oauth_consumer_key=xvz1evFS4wEEPTGEFPHBog&oauth_nonce=kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1318622958&oauth_token=370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb&oauth_version=1.0&status=Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21";
  assertEquals(paramaterString, exampleString);
});

Deno.test("Creating the signature base string", () => {
  const exampleString =
    "POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521";
  assertEquals(signatureBaseString, exampleString);
});

Deno.test("Getting a signing key", () => {
  const exampleString =
    "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE";
  assertEquals(signingKey, exampleString);
});

Deno.test("Calculating the signature", () => {
  const exampleString = "hCtSmYh+iHYCEqBWrE7C7hYmtUk=";
  assertEquals(signature, exampleString);
});

Deno.test("Building the header string", () => {
  const exampleString =
    'OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="hCtSmYh%2BiHYCEqBWrE7C7hYmtUk%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318622958", oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", oauth_version="1.0"';
  assertEquals(headerString, exampleString);
});

Deno.test("Get Request", () => {
  const url = baseUrl + "?" + params.toString();
  const request = getRequest(
    auth,
    url,
    { method: "POST" },
    { nonce: nonce, timestamp: timestamp },
  );
  assertEquals(request.headers.get("Authorization"), headerString);
  assertEquals(request.method, "POST");
  assertEquals(request.url, url);
});
