import './load-env.js';
import NFTbuilder from "./NFTbuilder.js";
import NFTstore from "./NFTstore.js";
import SuiClient from "./SuiClient.js";
import Miner from "./Miner.js";
import Chain from "./Chain.js";
import Adapter from "./Adapter.js";
import BSC from "./BSC.js";
import TXService from "./TXService.js";

export type SuiNetworkType = "mainnet" | "testnet" | "devnet";

class Hash {
  miner: Miner;
  builder: NFTbuilder;
  store: NFTstore;
  client: SuiClient;
  chain: Chain;
  adapter: Adapter;
  bsc: BSC;
  tx: TXService;

  constructor() {
    this.bsc = new BSC();
    this.builder = new NFTbuilder();
    this.store = new NFTstore();
    this.client = new SuiClient(process.env.NETWORK);
    this.adapter = new Adapter();
    this.chain = new Chain(this.client, this.adapter);
    this.miner = new Miner(this.bsc);
    this.tx = new TXService(
      this.client,
      process.env.MNEMONIC,
      process.env.HASH_CONTRACT
    );
  }

  async run() {
    while (true) {
      try {
        const snapshot = await this.chain.snapshot();
        if (!snapshot) return;

        const { header, block_hash } = snapshot.fields.last_block.fields;
        const { difficulty } = snapshot.fields;
        const { height } = header.fields;

        const { nonce } = this.miner.start(
          BigInt(height),
          block_hash,
          new Uint8Array([]),
          Number(difficulty)
        );

        const _snapshot = await this.chain.snapshot();
        if (!_snapshot) return;

        if (
          snapshot.fields.last_block.fields.header.fields.height ===
          _snapshot.fields.last_block.fields.header.fields.height
        ) {
          const result = await this.tx.sumbitBlock(
            nonce,
            [],
            new TextEncoder().encode(process.env.NFT_URL),
            process.env.CHAIN_OBJECT,
            process.env.BALANCE_KEEPER
          );

          console.log(result);

        } else {
          continue;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const hash = new Hash();
hash.run();
