<img src="banner-3.png" alt="Hash Layer Banner" />

---
# ⛏ Hash Layer Miner

This is a Node.js CPU miner for Hash Layer — a permissionless Proof-of-Work layer built on top of Sui. It allows anyone to contribute raw computation to a decentralized chain of blocks, each linked by SHA-256 and validated through transparent difficulty rules. The miner connects to the Sui network, reads the current chain state, constructs candidate blocks, and searches for a valid nonce that satisfies the current difficulty target. Once a valid block is found, it submits the result to the network.

---




## 📦 Requirements

- [<img src="https://nodejs.org/static/images/favicons/favicon.png" alt="Node.js Logo" width="14"/> Node.js](https://nodejs.org/) (LTS version recommended)
- [<img src="https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/643773c0d96a22a83c5baf48_Sui_Favicon.png" alt="sui Logo" width="14"/> A Sui wallet](https://sui.io/get-started) (private key or mnemonic) and 0.5 SUI
- 1 CPU core, 512mb RAM
---

## 🚀 Getting Started

### 1. Install node.js
 [<img src="https://nodejs.org/static/images/favicons/favicon.png" alt="Node.js Logo" width="14"/> Node.js official website](https://nodejs.org/en/download)

### 2. Download the miner

If you're using Git:

```bash
git clone https://github.com/GemsGame/hash-layer-miner.git
cd hash-layer-miner
```
Or just download the ZIP and unzip it.

### 3. Install dependencies
```bash
npm install
```
### 4. Edit a .env file
```bash
WALLET_KEY=your-private-key-or-mnemonic
```

### 5. Start mining
```bash
npm run start
```

---

## 🔗 Useful Links
- 🌐 [Hash Layer Twitter](https://x.com/hashLayer2)
- 💬 [Hash Layer Telegram](https://t.me/hash_layer)
- 📦 [Hash Layer Miner Repository](https://github.com/GemsGame/hash-layer-miner)
- 🧠 [Hash Layer Protocol Overview](https://github.com/GemsGame/hash-layer)

