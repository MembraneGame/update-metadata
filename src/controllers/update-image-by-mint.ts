import { NextFunction, Request, RequestHandler, Response } from 'express';
import { PublicKey } from '@solana/web3.js';
import { getMetaplex } from '../metaplex';
import { toMetaplexFile } from '@metaplex-foundation/js';
import { UploadedFile } from 'express-fileupload';

export const updateImageByMint: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (req.files?.image) {
      const mintAddress = new PublicKey(req.params.mintAddress);
      const { data, metadata } = req.body;
      const metaplex = await getMetaplex();
      const nft = await metaplex.nfts().findByMint({ mintAddress });

      const { data: buffer, name, mimetype } = req.files.image as UploadedFile;
      const metaplexFile = await toMetaplexFile(buffer, name);
      const { uri: newUri } = await metaplex.nfts().uploadMetadata({
        ...nft.json,
        ...metadata,
        image: metaplexFile,
        properties: {
          files: [
            {
              type: mimetype,
              uri: metaplexFile
            }
          ]
        }
      });
      await metaplex.nfts().update({
        nftOrSft: nft,
        ...data,
        uri: newUri
      });
      const updatedNft = await metaplex.nfts().refresh(nft);

      return res.json(updatedNft);
    }
    return next(new Error('Image is required'));
  } catch (err) {
    return next(err);
  }
};
