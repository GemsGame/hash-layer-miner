import 'dotenv/config';

try {
  require('dotenv').config({ path: '.env.secrets' });
} catch {
}

export const config = {
  mnemonic: process.env.MNEMONIC,
} as const;

if (!config.mnemonic) {
  throw new Error('❌ MNEMONIC not found! Create .env.secrets file with your mnemonic');
}