import express from 'express';
import { findByMint } from './controllers/find-by-mint';
import { updateByMint } from './controllers/update-by-mint';
import { updateImageByMint } from './controllers/update-image-by-mint';

const root = express.Router();

root.get('/mints/:mintAddress', findByMint);
root.post('/mints/:mintAddress/image', updateImageByMint);
root.post('/mints/:mintAddress', updateByMint);

export default root;
