import { SuiObjectResponse } from "@mysten/sui/client";

export interface ChainObject {
  fields: {
    difficulty: string;
    id: {
      id: string;
    };
    last_adjustment_time: string;
    last_block: {
      type: string;
      fields: Block;
    };
    reward: string;
  };
  type: string;
}


interface Header {
  height: bigint,
  previous_hash: Uint8Array,
  nonce: bigint,
  data: Uint8Array,     
}

interface Block {
   header: {
     type: string,
     fields: Header
   },
   block_hash: Uint8Array,
}


export default class Adapter {

   decode<T extends { type: string; fields: any }>(
    response: SuiObjectResponse,
    expectedType: string
  ): T {
    const content = response.data?.content;
    const type = response.data?.type;
    if (
      !content ||
      typeof content !== "object" ||
      type !== expectedType ||
      !("fields" in content)
    ) {
      throw new Error(`Expected type ${expectedType}, got ${content?.dataType}`);
    }

    return content as unknown as T;
  }
}
