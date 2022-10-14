import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { baFetch, BasicAuthInfo } from "./ba.ts";

const testUrl =
  "http://leggiero.sakura.ne.jp/xxxxbasic_auth_testxxxx/secret/kaiin_page_top.htm";

const auth: BasicAuthInfo = { username: "kaiin", password: "naisho" };

Deno.test("Fetch with BasicAuth by url string", async () => {
  const res = await baFetch(testUrl, auth);
  assertEquals(res.status, 200);
  res.body?.cancel();
});

Deno.test("Fetch with BasicAuth by url class", async () => {
  const url = new URL(testUrl);
  const res = await baFetch(url, auth);
  assertEquals(res.status, 200);
  res.body?.cancel();
});
