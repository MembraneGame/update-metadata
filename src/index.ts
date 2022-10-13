import express, { Application } from 'express';
import { config } from 'dotenv';
import { errorHandler, middlewares, notFoundError } from './middlewares';
import routes from './routes';

config();

const app: Application = express();
const port = process.env.PORT;

app.use(middlewares);
app.use('/', routes);
app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at port ${port}`);
});
