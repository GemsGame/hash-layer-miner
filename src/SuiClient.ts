import { getFullnodeUrl, SuiClient as Client } from '@mysten/sui/client';
import { SuiNetworkType } from './Hash.js';
import { Transaction } from '@mysten/sui/transactions';
import { Signer } from '@mysten/sui/cryptography';

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
    async executeTransaction(transaction: Transaction, signer: Signer) {
        return await this.client.signAndExecuteTransaction({
            transaction,
            signer,
            options: {
               showEffects: true,
               showEvents: true
            }
        });
    }
}

export default SuiClient;