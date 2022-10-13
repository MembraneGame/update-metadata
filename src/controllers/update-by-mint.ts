import { NextFunction, Request, RequestHandler, Response } from 'express';
import { PublicKey } from '@solana/web3.js';
import { getMetaplex } from '../metaplex';

export const updateByMint: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const mintAddress = new PublicKey(req.params.mintAddress);
    const { data, metadata } = req.body;
    const metaplex = await getMetaplex();
    const nft = await metaplex.nfts().findByMint({ mintAddress });
    const { uri: newUri } = await metaplex.nfts().uploadMetadata({
      ...nft.json,
      ...metadata
    });
    await metaplex.nfts().update({
      nftOrSft: nft,
      ...data,
      uri: newUri
    });
    const updatedNft = await metaplex.nfts().refresh(nft);

    // Execution time in ms
    // {
    //   getMetaplex: 57,
    //   findByMint: 514,
    //   uploadMetadata: 1480,
    //   update: 13830,
    //   refresh: 1320
    // }

    return res.json(updatedNft);
  } catch (err) {
    return next(err);
  }
};
