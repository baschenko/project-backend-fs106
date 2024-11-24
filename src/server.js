import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';

import moviesRouter from './routers/movies.js';
import authRouter from './routers/auth.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
// import { logger } from './middlewares/logger.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static('upload'));

  // app.use(logger);

  app.use('/auth', authRouter);
  app.use('/movies', moviesRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3001));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
