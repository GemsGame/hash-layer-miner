// load-env.ts
import { config } from 'dotenv';
config();

try {
  config({ path: '.env.secrets' });
} catch {
  console.log('⚠️  .env.secrets not found');
}