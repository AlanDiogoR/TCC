import path from 'node:path';

import http from 'node:http';

import dotenv from 'dotenv';
import express from 'express';

import mongoose from 'mongoose';

import { router } from './router';

import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);

export const io = new Server(server);

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('FATAL: defina MONGODB_URI no arquivo .env (veja .env.example).');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then( () => {
    const port = Number(process.env.PORT) || 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    app.use(express.json());
    app.use(router);

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch( (erro) => console.log('erro ao conectar', erro));
