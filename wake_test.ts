import "./deps_test.ts";
import { wake } from "./wake.ts";

Deno.test("wake", () => {
  const MAC = Deno.env.get("MAC");

  if (!MAC) {
    throw new Error('"MAC" environment variable not found');
  }

  wake(MAC);
});
