import { Buffer } from "node:buffer";
import { createSocket } from "node:dgram";
import { concat } from "./deps.ts";

export const createMagickPacket = (mac: string): Uint8Array => {
  const octets = mac.match(/[0-9a-fA-F]{2}/g);

  let packet = new Uint8Array(0x06).fill(0xff);
  const macArr = Uint8Array.from(octets!.map((octet) => parseInt(octet, 16)));

  for (let i = 0; i < 16; i++) {
    packet = concat(packet, macArr);
  }

  return packet;
};

export const wakeOnLan = (macAddress: string) => {
  const magicPacket = Buffer.from(createMagickPacket(macAddress));

  const socket = createSocket("udp4");

  socket.on("error", (e) => console.error(e));
  socket.once("listening", () => socket.setBroadcast(true));

  return new Promise((resolve, reject) => {
    socket.send(
      magicPacket,
      0,
      magicPacket.length,
      9,
      "255.255.255.255",
      (err, res) => {
        const result = res == magicPacket.length;
        if (err) return reject(err);
        resolve(result);
        socket.close();
      },
    );
  });
};
