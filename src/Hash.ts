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
    this.builder = new NFTbuilder();
    this.store = new NFTstore();
    this.client = new SuiClient("devnet");
    this.adapter = new Adapter();
    this.chain = new Chain(this.client, this.adapter);
    this.miner = new Miner(this.bsc);
  }

  async run() {

    while(true) {
      try {
        const snapshot = await this.chain.snapshot();
        const {
          height = 0,
          previous_hash = new Uint8Array([]),
          nonce = 0,
          data = new Uint8Array([]),
        } = snapshot?.fields.last_block.fields ?? {};

        const {
          difficulty
        } = snapshot?.fields ?? {};

        const blockBytes = this.bsc.getHashBytes(
          BigInt(height),
          previous_hash,
          BigInt(nonce),
          data
        );

        const {nonce: _nonce, hash } = this.miner.start(BigInt(height), blockBytes, new Uint8Array([]), Number(difficulty));
        const _snapshot = await this.chain.snapshot();
        
        if(snapshot?.fields.last_block.fields?.height === _snapshot?.fields.last_block.fields?.height) {
            console.log(_nonce.toString(), hash);
            
        } else {
            console.log('...block is expired');
        }

      } catch (err) {
        console.log(err);
      }
    }
  }
}

const hash = new Hash();
hash.run();
