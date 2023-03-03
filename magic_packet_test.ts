import { assertEquals } from "./deps_test.ts";
import { magickPacket } from "./magic_packet.ts";

Deno.test("magicPacket", () => {
  const testMacAddress = "77:e0:e3:92:45:67";
  // deno-fmt-ignore
  const referenceMagicPacket = new Uint8Array([
    255, 255, 255, 255, 255, 255,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
    119, 224, 227, 146, 69, 103,
  ]);

  assertEquals(magickPacket(testMacAddress), referenceMagicPacket);
});
