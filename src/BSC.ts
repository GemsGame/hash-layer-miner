import { bcs } from "@mysten/bcs";
import crypto from "crypto";

export default class BSC {

  /*
  
  Сериализация данных с обьекта сети.
  Получение хеша блока.

  */
  getHashBytes(
    height: number,
    previous_hash: Uint8Array,
    nonce: number,
    data: Uint8Array
  ) {
    const Block = bcs.struct("Block", {
      height: bcs.u64(),
      previous_hash: bcs.vector(bcs.u8()),
      nonce: bcs.u64(),
      data: bcs.option(bcs.vector(bcs.u8())),
    });
    const input = { height, previous_hash, nonce, data };
    const bytes = Block.serialize(input).toBytes();
    return crypto.createHash("sha256").update(bytes).digest();
  }
}
