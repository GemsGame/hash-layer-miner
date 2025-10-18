import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import SuiClient from "./SuiClient.js";

export default class TXService {
  keypar: Ed25519Keypair;
  contractId: string;

  constructor(
    private client: SuiClient,
    mnemonic: string | undefined,
    contractId: string | undefined
  ) {
    if (!mnemonic) throw new Error("Mnemonic is required for Submitter");
    if (!contractId) throw new Error("ContractId is required for Submitter");

    this.keypar = Ed25519Keypair.deriveKeypair(mnemonic, "m/44'/784'/0'/0'/0'");
    this.contractId = contractId;
  }

  private createTx(
    nonce: bigint,
    data: number[],
    imageUrl: Uint8Array,
    chainId: string
  ) {
    const tx = new Transaction();
    tx.moveCall({
      target: `${this.contractId}::hash_layer::create_block`,
      arguments: [
        tx.pure.u64(nonce),
        tx.pure.vector("u8", data), // <vector<u8>>
        tx.pure.vector("u8", imageUrl), // vector<u8>
        tx.object(chainId),
        tx.object.clock(),
      ],
    });

    tx.setGasPrice(1000);
    tx.setGasBudget(3500000);
    return tx;
  }

  public async sumbitBlock(
    nonce: bigint,
    data: number[],
    imageUrl: Uint8Array,
    chainId: string | undefined
  ) {
    if (!imageUrl) throw new Error("imageUrl is required");
    if (!chainId) throw new Error("chainId is required");

    try {
      const tx = this.createTx(nonce, data, imageUrl, chainId);
      const result = await this.client.executeTransaction(tx, this.keypar);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
