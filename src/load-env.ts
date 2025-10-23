import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Загружаем .env
dotenv.config({ path: resolve(__dirname, '../.env') });

// Загружаем .env.secrets, если существует
const secretsPath = resolve(__dirname, '../.env.secrets');
if (fs.existsSync(secretsPath)) {
  dotenv.config({ path: secretsPath });
} else {
  console.log('⚠️  .env.secrets not found');
}

// Экспорт переменных
export const config = {
  mnemonic: process.env.MNEMONIC,
  network: process.env.NETWORK,
  rpc: process.env.RPC_URL,
} as const;

if (!config.mnemonic) {
  throw new Error('❌ MNEMONIC not found! Create .env.secrets file with your mnemonic');
}
