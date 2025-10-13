import { getFullnodeUrl, SuiClient as Client } from '@mysten/sui/client';
import { SuiNetworkType } from './Hash.js';

export class SuiClient {
    client: Client;
    
    constructor(network: SuiNetworkType) {
        this.client = new Client({ url: getFullnodeUrl(network) });
    }

    // Получить информацию об объекте
    async getObject(objectId: string) {
        return await this.client.getObject({
            id: objectId,
            options: {
                showType: true,
                showOwner: true,
                showContent: true,
            }
        });
    }

    // Получить баланс кошелька
    async getBalance(address: string) {
        return await this.client.getBalance({
            owner: address
        });
    }

    // Получить все объекты кошелька
    async getOwnedObjects(address: string) {
        return await this.client.getOwnedObjects({
            owner: address
        });
    }

    // Выполнить транзакцию
    async executeTransaction(transactionBlock: string | Uint8Array<ArrayBufferLike>, signature: string) {
        return await this.client.executeTransactionBlock({
            transactionBlock,
            signature,
            options: {
                showEffects: true,
                showEvents: true,
                showBalanceChanges: true,
                showInput: true,
                showObjectChanges: true,
                showRawInput: true,
                showRawEffects: true
            }
        });
    }
}

export default SuiClient;