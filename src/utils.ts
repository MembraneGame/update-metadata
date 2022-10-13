import { promises as fs } from 'fs';
import { join } from 'path';
import { Keypair } from '@solana/web3.js';

const { env, cwd } = process;

export const getKeypair = async (): Promise<Keypair> => {
  const keypairPath = join(cwd(), env.KEYPAIR_PATH || '');
  const keypairFile = await fs.readFile(keypairPath);
  const secretKey = Buffer.from(JSON.parse(keypairFile.toString()));
  return Keypair.fromSecretKey(secretKey);
};
