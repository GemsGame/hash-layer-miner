import BSC from "./BSC.js";

class Miner {
  constructor(private bsc: BSC) {}

  leadingZeros(byte: number): number {
    if (byte === 0) return 8;
    else if (byte < 2) return 7;
    else if (byte < 4) return 6;
    else if (byte < 8) return 5;
    else if (byte < 16) return 4;
    else if (byte < 32) return 3;
    else if (byte < 64) return 2;
    else if (byte < 128) return 1;
    else return 0;
  }

  countLeadingZeroBits(hash: Uint8Array): number {
    let count = 0;
    for (let i = 0; i < hash.length; i++) {

      const byte = hash[i]!;
      const zeros = this.leadingZeros(byte);
      count += zeros;
      if (zeros < 8) break;
    }
    return count;
  }

  start(
    height: number, //последний height
    previous_hash: Uint8Array, //хеш предыдущего блока
    data: Uint8Array, //текущие данные
    difficulty: number //сложность
  ): { nonce: number; hash: string } {
    let nonce = 0;

    while (true) {
      
      const hashBytes = this.bsc.getHashBytes(
        height + 1,
        previous_hash,
        nonce,
        data
      );

      const leadingZeros = this.countLeadingZeroBits(hashBytes);

      if (leadingZeros >= difficulty) {
        return { nonce, hash: Buffer.from(hashBytes).toString("hex") };
      }

      nonce++;
    }
  }
}

export default Miner;
