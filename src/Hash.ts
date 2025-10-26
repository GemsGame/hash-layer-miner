import "./load-env.js";
import NFTbuilder from "./NFTbuilder.js";
import NFTstore from "./NFTstore.js";
import SuiClient from "./SuiClient.js";
import Miner from "./Miner.js";
import Chain from "./Chain.js";
import Adapter from "./Adapter.js";
import BSC from "./BSC.js";
import TXService from "./TXService.js";
import { SnapshotWatcher } from "./SnapshotWatcher.js";

class Hash {
  miner: Miner;
  builder: NFTbuilder;
  store: NFTstore;
  client: SuiClient;
  chain: Chain;
  adapter: Adapter;
  bsc: BSC;
  tx: TXService;
  watcher: SnapshotWatcher;

  constructor() {
    this.bsc = new BSC();
    this.builder = new NFTbuilder();
    this.store = new NFTstore();
    this.client = new SuiClient(process.env.RPC_PROVIDER);
    this.adapter = new Adapter();
    this.chain = new Chain(this.client, this.adapter);
    this.miner = new Miner(this.bsc);
    this.tx = new TXService(
      this.client,
      process.env.MNEMONIC,
      process.env.HASH_CONTRACT
    );

    this.watcher = new SnapshotWatcher(this.chain);
  }

  async run() {
    this.watcher.start(async (snapshot) => {
      this.miner.stop();

      const { header, block_hash } = snapshot.fields.last_block.fields;
      const { difficulty } = snapshot.fields;
      const { height } = header.fields;

      console.log("New snapshot at height", height);

      try {
        const result = await this.miner.start(
          BigInt(height),
          block_hash,
          new Uint8Array([]),
          Number(difficulty)
        );

        if (result) {
          const { nonce, hash } = result;
          console.log("༼ つ ◕_◕ ༽つ" + hash, nonce);

          try {
            const tx = await this.tx.sumbitBlock(
              nonce,
              [],
              new TextEncoder().encode(process.env.NFT_URL),
              process.env.CHAIN_OBJECT,
              process.env.BALANCE_KEEPER
            );
            console.log(tx);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
}

const hash = new Hash();
hash.run();
