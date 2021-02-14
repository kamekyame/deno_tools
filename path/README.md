# path

This is path tool.

## Path resolver

convert relative path to absolute path

```typescript
import { pathResolver } from "https://kamekyame.github.io/deno_tools/path/mod.ts";

const resolver = pathResolver(import.meta);

console.log(resolver("./test.txt"));
```

### case1 (on Windows)
`import.meta.url` : `files:///C:/Users/testuser/Documents/a.ts`

output : `C:\Users\testuser\Documents\test.txt`

### case2 (on Unix)
`import.meta.url` : `files:///home/testuser/Documents/a.ts`

output : `\home\testuser\Documents\test.txt`
