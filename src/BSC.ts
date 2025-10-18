import { bcs } from "@mysten/bcs";
import blake2 from "blake2";


export default class BSC {

  getHashBytes(
    height: bigint,
    previous_hash: Uint8Array,
    nonce: bigint,
    data: Uint8Array
  ) {
    const Block = bcs.struct("Block", {
      height: bcs.u64(),
      previous_hash: bcs.vector(bcs.u8()),
      nonce: bcs.u64(),
      data: bcs.vector(bcs.u8()),
    });
    const input = { height: height.toString(), previous_hash, nonce: nonce.toString(), data };
    const bytes = Block.serialize(input).toBytes();
    return blake2.createHash("blake2b", { digestLength: 32 }).update(Buffer.from(bytes)).digest();
  }
}
