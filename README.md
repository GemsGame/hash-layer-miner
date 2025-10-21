<img src="assets/hash-layer.png" alt="Hash Layer Banner" />

# ⛏ Hash Layer Miner

This is a Node.js CPU miner for Hash Layer — a permissionless Proof-of-Work layer built on top of Sui. It allows anyone to contribute raw computation to a decentralized chain of blocks, each linked by hash and validated through transparent difficulty rules. The miner connects to the Sui network, reads the current chain state, constructs candidate blocks, and searches for a valid nonce that satisfies the current difficulty target. Once a valid block is found, it submits the result to the network.

<img src="assets/Снимок экрана 2025-10-18 170003.png" alt="Hash Layer Banner" />

---




## 📦 Requirements

- [<img src="https://nodejs.org/static/images/favicons/favicon.png" alt="Node.js Logo" width="14"/> Node.js](https://nodejs.org/)
- [<img src="https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/643773c0d96a22a83c5baf48_Sui_Favicon.png" alt="sui Logo" width="14"> A Sui wallet](https://sui.io/get-started) (mnemonic 12 words) and 1 SUI
- <img src="https://cdn-icons-png.flaticon.com/512/8186/8186331.png" alt="CPU" width="14"/> 1 CPU core, 512mb RAM

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
### 4. Create a .env.secrets file near .env and add text
```bash
MNEMONIC="word word word word word word word word word word" # Your wallet (12 words)
```

### 5. Start mining
```bash
npm run start
```
### 6. Mint coins
After mining you can mint your reward by that command.
```bash
npm run mint
```
---

## 🔗 Useful Links
- 💬 [Hash Layer Telegram](https://t.me/hash_layer)
- 🌐 [Hash Layer Twitter](https://x.com/hashLayer2)
- 🧠 [Hash Layer Whitepaper](https://bafkreihstayvzbnbzoewopnmwsvqck2w3h2adrcuoc46pob4visefsy6k4.ipfs.w3s.link)
- 📦 [Hash Layer Miner Repository](https://github.com/GemsGame/hash-layer-miner)


