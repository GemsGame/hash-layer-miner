import crypto from "crypto";

class Miner {

  start(input: string, data: string, difficulty: number): { nonce: number; hash: string } {
    let nonce = 0;
    const targetPrefix = "0".repeat(difficulty);

    while (true) {
      const i = input + nonce + data;
      const hash = crypto.createHash("sha256").update(i).digest("hex");

      if (hash.startsWith(targetPrefix)) {
        return { nonce, hash };
      }

      nonce++;
    }
  }
}

export default Miner;
