import Chain from "./Chain.js";

export class SnapshotWatcher {
  private lastHeight: bigint | null = null;
  private lastHash: string | null = null;

  constructor(private chain: Chain, private interval = 1000) {}

  async start(onUpdate: (snapshot: any) => void) {
    while (true) {
      try {
        const snapshot = await this.chain.snapshot();
        if (!snapshot) continue;

        const { header, block_hash } = snapshot.fields.last_block.fields;
        const height = BigInt(header.fields.height);
        const hashHex = Buffer.from(block_hash).toString("hex");

        if (height !== this.lastHeight || hashHex !== this.lastHash) {
          this.lastHeight = height;
          this.lastHash = hashHex;
          onUpdate(snapshot);
        }

        await new Promise((r) => setTimeout(r, this.interval));
      } catch (err) {
        throw err;
      }
    }
  }
}
