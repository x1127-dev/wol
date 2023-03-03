import { magickPacket } from "./magic_packet.ts";

/**
 * Send Wake on LAN (WoL)	frame over a local Ethernet network
 * @param macAddress target device MAC address
 */
export const wake = async (macAddress: string): Promise<void> => {
  const conn = Deno.listenDatagram({
    port: 0,
    hostname: "0.0.0.0",
    transport: "udp",
  });

  await conn.send(magickPacket(macAddress), {
    transport: "udp",
    hostname: "255.255.255.255",
    port: 9,
  });

  conn.close();
};
