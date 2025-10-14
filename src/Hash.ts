import "dotenv/config";

import NFTbuilder from "./NFTbuilder.js";
import NFTstore from "./NFTstore.js";
import SuiClient from "./SuiClient.js";
import Miner from "./Miner.js";
import Chain from "./Chain.js";
import Adapter from "./Adapter.js";
import BSC from "./BSC.js";

// Главная точка входа: инициализация майнера, генерация артефакта, сохранение в NFTstore

// 1. Загружаем данные блока
// 2. Запускаем PoW через Miner
// 3. Строим NFT через NFTbuilder
// 4. Сохраняем артефакт в NFTstore

export type SuiNetworkType = "mainnet" | "testnet" | "devnet";

class Hash {
  miner: Miner;
  builder: NFTbuilder;
  store: NFTstore;
  client: SuiClient;
  chain: Chain;
  adapter: Adapter;
  bsc: BSC;

  constructor() {
    this.bsc = new BSC();
    this.miner = new Miner(this.bsc);
    this.builder = new NFTbuilder();
    this.store = new NFTstore();
    this.client = new SuiClient("devnet");
    this.adapter = new Adapter();
    this.chain = new Chain(this.client, this.adapter);
  }

  async run() {
    try {
      const result = await this.chain.snapshot();

      const bytes = this.bsc.getHashBytes(
        Number(result?.fields.last_block.fields.height),
        result?.fields.last_block.fields.previous_hash || new Uint8Array([]),
        Number(result?.fields.last_block.fields.nonce) || 0,
        result?.fields.last_block.fields.data || new Uint8Array([])
      );
      console.log(bytes)
    } catch (err) {
      console.log(err);
    }
  }
}

const hash = new Hash();
hash.run();
