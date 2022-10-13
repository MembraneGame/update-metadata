import { NextFunction, Request, RequestHandler, Response } from 'express';
import { PublicKey } from '@solana/web3.js';
import { getMetaplex } from '../metaplex';

export const findByMint: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const mintAddress = new PublicKey(req.params.mintAddress);
    const metaplex = await getMetaplex();
    const nft = await metaplex.nfts().findByMint({ mintAddress });

    return res.json(nft);
  } catch (err) {
    return next(err);
  }
};
