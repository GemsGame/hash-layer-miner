import { ChainObject } from "./Adapter.js";
import BSC from "./BSC.js";
import Chain from "./Chain.js";

class Miner {
  snapshot: ChainObject | null;

  constructor(private bsc: BSC, private chain: Chain) {
    this.snapshot = null;
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

  async start() {
    try {
      if (this.snapshot === null) {
        this.snapshot = await this.chain.snapshot();
        if (!this.snapshot) throw new Error("snapshot");
      }

      const { header, block_hash } = this.snapshot.fields.last_block.fields;
      const { difficulty } = this.snapshot.fields;
      const height = BigInt(header.fields.height);

      let nonce = BigInt(Math.floor(Math.random() * 1e12));
      let iteration = 0n;
      let start = Date.now();

      while (true) {
        const hashBytes = this.bsc.getHashBytes(
          height + 1n,
          block_hash,
          nonce,
          new Uint8Array([])
        );

        if (this.hasLeadingZeroBits(hashBytes, Number(difficulty))) {
          return { nonce, hash: Buffer.from(hashBytes).toString("hex") };
        }

        nonce++;
        iteration++;

        if (iteration % 100000n === 0n) {
          
          const _snapshot = await this.chain.snapshot();
          if (!_snapshot) throw new Error("snapshot");
          const { header } = _snapshot.fields.last_block.fields;
          const _height = BigInt(header.fields.height);

          const elapsed = (Date.now() - start) / 1000;
          const hashrate = Number(iteration) / elapsed;
          console.log(`Tried ${iteration} nonces, ~${hashrate.toFixed(2)} H/s`);

          if (height !== _height) {

            console.log(
              "New block at height " +
                _height
            );

            this.snapshot = _snapshot;

            return null;
          }
        }
      }
    } catch (err) {
      throw err;
    }
  }
}

export default Miner;
