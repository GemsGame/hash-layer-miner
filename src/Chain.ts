import "./load-env.js";

import Adapter, { ChainObject } from "./Adapter.js";
import SuiClient from "./SuiClient.js";

export default class Chain {
  constructor(private suiClient: SuiClient, private adapter: Adapter) {}

  async snapshot() {
    if (!process.env.CHAIN_OBJECT || !process.env.CHAIN_OBJECT_TYPE) return;

    try {
      const response = await this.suiClient.getObject(process.env.CHAIN_OBJECT);
      return this.adapter.decode<ChainObject>(
        response,
        process.env.CHAIN_OBJECT_TYPE
      );
    } catch (err) {
      throw err;
    }
  }
}
