import { assertEquals } from "https://deno.land/std@0.87.0/testing/asserts.ts";
import { pathResolver } from "./pathresolver.ts";

Deno.test("pathResolver on Windows", () => {
  const meta: ImportMeta = {
    url: "file:///C:/Users/testuser/Documents/test.ts",
    main: true,
  };
  const resolve = pathResolver(meta);

  assertEquals(
    "C:\\Users\\testuser\\Documents\\test2.ts",
    resolve("./test2.ts"),
  );

  assertEquals(
    "C:\\Users\\testuser\\Documents\\data\\test2.ts",
    resolve("./data/test2.ts"),
  );

  assertEquals(
    "C:\\Users\\testuser\\test2.ts",
    resolve("../test2.ts"),
  );
});

Deno.test("pathResolver on Unix", () => {
  const meta: ImportMeta = {
    url: "file:///home/testuser/Documents/test.ts",
    main: true,
  };
  const resolve = pathResolver(meta);

  assertEquals(
    "\\home\\testuser\\Documents\\test2.ts",
    resolve("./test2.ts"),
  );

  assertEquals(
    "\\home\\testuser\\Documents\\data\\test2.ts",
    resolve("./data/test2.ts"),
  );

  assertEquals(
    "\\home\\testuser\\test2.ts",
    resolve("../test2.ts"),
  );
});
