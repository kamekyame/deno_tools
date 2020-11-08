# http

This is http fetch tool.

## Basic Auth

```typescript
import {
  baFetch,
  BasicAuthInfo,
} from "https://kamekyame.github.io/deno_tools/http/mod.ts";

const testUrl = "http://leggiero.sakura.ne.jp/xxxxbasic_auth_testxxxx/secret/kaiin_page_top.htm";

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
} from "https://kamekyame.github.io/deno_tools/http/mod.ts";

const auth: OAuth1Info = {
  consumerKey: "",
  consumerSecret: "",
  token: "",
  tokenSecret: "",
};

await oAuth1Fetch(auth, "http://www.example.com");
```