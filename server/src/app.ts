import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authMiddleware from './middlewares/firebaseAuth';
import config from './config/database';

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors(config.cors))

app.use('/', authMiddleware);

export default app;
