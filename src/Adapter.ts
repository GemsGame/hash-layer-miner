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
      fields: ChainFields;
    };
    reward: string;
  };
  type: string;
}

interface ChainFields {
  data: number[];
  height: string;
  nonce: string;
  previous_hash: any[];
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
