import { concat } from "./deps.ts";

/**
 * Generate Magic Packet frame
 * 
 * The magic packet is a frame that is most often sent as a broadcast
 * and that contains anywhere within its payload 6 bytes of all 255 (FF FF FF FF FF FF in hexadecimal),
 * followed by sixteen repetitions of the target computer's 48-bit MAC address, for a total of 102 bytes.
 * @param macAddress Device MAC Address
 */
export const magickPacket = (macAddress: string): Uint8Array => {
  const octets = macAddress.match(/[0-9a-fA-F]{2}/g);

  let packet = new Uint8Array(0x06).fill(0xff);
  const macArr = Uint8Array.from(octets!.map((octet) => parseInt(octet, 16)));

  for (let i = 0; i < 16; i++) {
    packet = concat(packet, macArr);
  }

  return packet;
};
