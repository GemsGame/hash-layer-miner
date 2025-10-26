import {
  SuiClient as Client,
  SuiHTTPTransport,
} from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Signer } from "@mysten/sui/cryptography";

export class SuiClient {
  client: Client;

  constructor(url: string | undefined) {
    if (!url) throw new Error("url is req");

    this.client = new Client({
      transport: new SuiHTTPTransport({
        url,
      }),
    });
  }

  async withRetry<T>(
    fn: () => Promise<T>,
    retries = 10,
    delay = 500
  ): Promise<T> {
    let lastErr: any;
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        console.warn(
          `SuiClient request failed (attempt ${i + 1}/${retries}):`,
          err
        );
        if (i < retries - 1) {
          await new Promise((r) => setTimeout(r, delay * (i + 1)));
        }
      }
    }
    throw lastErr;
  }
  // Получить информацию об объекте
  async getObject(objectId: string) {
    return await this.withRetry(
      async () =>
        await this.client.getObject({
          id: objectId,
          options: {
            showType: true,
            showOwner: true,
            showContent: true,
          },
        })
    );
  }

  // Получить баланс кошелька
  async getBalance(address: string) {
    return await this.client.getBalance({
      owner: address,
    });
  }

  // Получить все объекты кошелька
  async getOwnedObjects(address: string) {
    return await this.client.getOwnedObjects({
      owner: address,
    });
  }

  // Выполнить транзакцию
  async executeTransaction(transaction: Transaction, signer: Signer) {
    return await this.client.signAndExecuteTransaction({
      transaction,
      signer,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });
  }
}

export default SuiClient;
