import BSC from "./BSC.js";

class Miner {
  private running = false;
  private generation = 0;
  constructor(private bsc: BSC) {}

  stop() {
    this.running = false;
    this.generation++;
  }

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

  async start(
    height: bigint,
    previous_hash: Uint8Array,
    data: Uint8Array,
    difficulty: number
  ) {
    this.running = true;
    const myGen = this.generation;
    let nonce = BigInt(Math.floor(Math.random() * 1e8));
    let chunkSize = 10_000;
    let start = Date.now();
    let counter = 0n;

    while (this.running && myGen === this.generation) {
      for (let i = 0; i < chunkSize && this.running; i++) {

        const hashBytes = this.bsc.getHashBytes(height + 1n, previous_hash, nonce, data);
        if (this.hasLeadingZeroBits(hashBytes, difficulty)) {
          this.running = false;
          return { nonce, hash: Buffer.from(hashBytes).toString("hex") };
        }
        nonce++;
        counter++;
      }

      await new Promise(r => setImmediate(r));

       if (counter % 100000n === 0n) {
        const elapsed = (Date.now() - start) / 1000; 
        const hashrate = Number(counter) / elapsed;
        console.log(`Tried ${counter} nonces, ~${hashrate.toFixed(2)} H/s`);
      }

    }

    return null;
  }
}

export default Miner;
