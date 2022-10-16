# http

This is http fetch tool.

## Basic Auth

```typescript
import {
  baFetch,
  BasicAuthInfo,
} from "https://cdn.jsdelivr.net/gh/kamekyame/deno_tools/http/mod.ts";

const testUrl =
  "http://leggiero.sakura.ne.jp/xxxxbasic_auth_testxxxx/secret/kaiin_page_top.htm";

const auth: BasicAuthInfo = { username: "kaiin", password: "naisho" };

const res = await baFetch(testUrl, auth);
console.log(res.status);
// success -> 200
```

## OAuth1.0a

```typescript
import {
  oAuth1Fetch,
  OAuth1Info,
} from "https://cdn.jsdelivr.net/gh/kamekyame/deno_tools/http/mod.ts";

const auth: OAuth1Info = {
  consumerKey: "",
  consumerSecret: "",
  token: "",
  tokenSecret: "",
};

await oAuth1Fetch(auth, "http://www.example.com");
```

## Bearer

```typescript
import {
  bearerFetch,
} from "https://cdn.jsdelivr.net/gh/kamekyame/deno_tools/http/mod.ts";

const bearerToken = "";

const res = await bearerFetch("http://www.example.com", bearerToken);
```
