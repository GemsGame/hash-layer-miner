import BSC from "./BSC.js";

class Miner {
  constructor(private bsc: BSC) {}

  hasLeadingZeroBits(hash: Uint8Array, bits: number): boolean {
    const fullZeroBytes = Math.floor(bits / 8);
    const partialBits = bits % 8;

    // Вычисляем необходимую длину
    const neededLen = fullZeroBytes + (partialBits > 0 ? 1 : 0);
    if (hash.length < neededLen) {
      return false;
    }

    // Проверяем полные нулевые байты
    for (let i = 0; i < fullZeroBytes; i++) {
      if (hash[i] !== 0) {
        return false;
      }
    }

    // Проверяем частичные биты
    if (partialBits > 0) {
      const byte = hash[fullZeroBytes]!;
      const shift = 8 - partialBits;
      const mask = (0xff << shift) & 0xff; // Маска для старших partialBits битов

      if ((byte & mask) !== 0) {
        return false;
      }
    }

    return true;
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

      if (this.hasLeadingZeroBits(hashBytes, difficulty)) {
        const hex = Buffer.from(hashBytes).toString("hex");

        console.log("༼ つ ◕_◕ ༽つ" + hex, nonce);
        return { nonce, hash: hex };
      }

      nonce++;
      counter++;

      if (counter % 100000n === 0n) {
        const elapsed = (Date.now() - start) / 1000; // секунды, number
        const hashrate = Number(counter) / elapsed; // hashes per second
        console.log(`Tried ${counter} nonces, ~${hashrate.toFixed(2)} H/s`);
      }
    }
  }
}

export default Miner;
