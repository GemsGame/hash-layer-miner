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
    height: bigint,
    previous_hash: Uint8Array,
    data: Uint8Array,
    difficulty: number
  ): { nonce: bigint; hash: string } {
    let nonce = 0n;
    let counter = 0n;
    let start = Date.now();

    while (true) {
      const hashBytes = this.bsc.getHashBytes(
        height + 1n,
        previous_hash,
        nonce,
        data
      );

      if (this.countLeadingZeroBits(hashBytes) >= difficulty) {
        const hex = Buffer.from(hashBytes).toString("hex");

        console.log("༼ つ ◕_◕ ༽つ" + hex, nonce);
        return { nonce, hash: hex };
      }

      nonce++;
      counter++;

      if (counter % 100000n === 0n) {
        const elapsed = (Date.now() - start) / 1000; // секунды, number
        const hashrate = Number(counter) / elapsed;  // hashes per second
        console.log(`Tried ${counter} nonces, ~${hashrate.toFixed(2)} H/s`);
      }
    }
  }
}

export default Miner;
