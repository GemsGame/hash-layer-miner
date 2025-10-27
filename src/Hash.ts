import "./load-env.js";
import NFTbuilder from "./NFTbuilder.js";
import NFTstore from "./NFTstore.js";
import SuiClient from "./SuiClient.js";
import Miner from "./Miner.js";
import Chain from "./Chain.js";
import Adapter from "./Adapter.js";
import BSC from "./BSC.js";
import TXService from "./TXService.js";

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
    this.client = new SuiClient(process.env.RPC_PROVIDER);
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

    let lastHeight: bigint | null = null;
    while (true) {
      try {
        const snapshot = await this.chain.snapshot();

        if(!snapshot) throw new Error("snapshot")

        const { header, block_hash } = snapshot.fields.last_block.fields;
        const { difficulty } = snapshot.fields;
        const height = BigInt(header.fields.height);


         // проверка: обновился ли блок
        if (lastHeight !== null && height === lastHeight) {
          // блок не изменился
          await new Promise(r => setTimeout(r, 1500));
          continue;
        }

        lastHeight = height;
        
        this.miner.stop();
        console.log("New snapshot at height", height.toString());
  
        const result = await this.miner.start(
          height,
          block_hash,
          new Uint8Array([]),
          Number(difficulty)
        );

        if (!result) {continue;}

        const { nonce, hash } = result;
        console.log("༼ つ ◕_◕ ༽つ", hash, nonce.toString());

        try {
          const tx = await this.tx.sumbitBlock(
            nonce,
            [],
            new TextEncoder().encode(process.env.NFT_URL),
            process.env.CHAIN_OBJECT,
            process.env.BALANCE_KEEPER
          );
          console.log("Block submitted:", tx);
        } catch (err: any) {
          if (err?.code === -32002) {
            console.warn(
              "Rejected by validators (object conflict). Wait for next snapshot."
            );
          } else {
            console.error("Submit block failed:", err?.message || err);
          }
        }
      } catch (err: any) {
        console.error("Snapshot error:", err?.message || err);
      }

      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

const hash = new Hash();
hash.run();
