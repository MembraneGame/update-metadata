import express, {
  ErrorRequestHandler,
  Request,
  RequestHandler,
  Response
} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

export const middlewares = [
  fileUpload(),
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
  helmet(),
  morgan('dev')
];

export const notFoundError: RequestHandler = (req: Request, res: Response) => {
  return res.status(404).json({ message: 'Not found' });
};

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  console.error(err);
  return res.status(500).json({
    message: process.env.NODE_ENV === 'production' ? 'Unknown error' : `${err}`
  });
};
