# ⛏ Hash Layer Miner

This is a Node.js miner for Hash Layer — a permissionless Proof-of-Work layer built on top of Sui. It allows anyone to contribute raw computation to a decentralized chain of blocks, each linked by SHA-256 and validated through transparent difficulty rules. The miner connects to the Sui network, reads the current chain state, constructs candidate blocks, and searches for a valid nonce that satisfies the current difficulty target. Once a valid block is found, it submits the result to the network.

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (LTS version recommended)
- A Sui wallet (private key or mnemonic)
---

## 🚀 Getting Started

### 1. Download the miner

If you're using Git:

```bash
git clone https://github.com/GemsGame/hash-layer-miner.git
cd hash-layer-miner
```
Or just download the ZIP and unzip it.

### 2. Install dependencies
```bash
npm install
```
### 3. Edit a .env file
```bash
WALLET_KEY=your-private-key-or-mnemonic
```

### 4. Start mining
```bash
npm run start
```

---

## 🔗 Useful Links

- 🌐 [Sui Documentation](https://docs.sui.io/)
- 📦 [Hash Layer Miner Repository](https://github.com/GemsGame/hash-layer-miner)
- 🧠 [Hash Layer Protocol Overview](https://github.com/GemsGame/hash-layer)
- 💬 [Join the Hash Layer](https://t.me/hash_layer)
- 📊 [Sui Explorer](https://explorer.sui.io/)
