import "dotenv/config";

import NFTbuilder from "./NFTbuilder.js";
import NFTstore from "./NFTstore.js";
import SuiClient from "./SuiClient.js";
import Miner from "./Miner.js";
import Chain from "./Chain.js";
import Adapter from "./Adapter.js";

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

  constructor() {
    this.miner = new Miner();
    this.builder = new NFTbuilder();
    this.store = new NFTstore();
    this.client = new SuiClient("devnet");
    this.adapter = new Adapter();
    this.chain = new Chain(this.client, this.adapter);
  }

  async run() {
    try {
      const result = await this.chain.snapshot();
      console.log(result);
    } catch (err) {}
  }
}

const hash = new Hash();
hash.run();

