import {
  bundlrStorage,
  keypairIdentity,
  Metaplex
} from '@metaplex-foundation/js';
import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js';
import { getKeypair } from './utils';

export const getMetaplex = async (): Promise<Metaplex> => {
  const providerUrl = clusterApiUrl(process.env.CLUSTER as Cluster);
  const connection = new Connection(providerUrl);

  const wallet = await getKeypair();
  return Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(
      bundlrStorage({
        address: process.env.STORAGE,
        providerUrl
      })
    );
};
