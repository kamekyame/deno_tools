import * as path from "https://deno.land/std@0.211.0/path/mod.ts";

export function pathResolver(meta: ImportMeta): (p: string) => string {
  return (p) => path.fromFileUrl(new URL(p, meta.url));
}
