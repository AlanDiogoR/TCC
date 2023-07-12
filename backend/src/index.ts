import path from 'node:path';

import http from 'node:http';

import express from 'express';

import mongoose from 'mongoose';

import { router } from './router';

import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017/local')
  .then( () => {
    const port = 3001;


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
  .catch( () => console.log('erro ao conectar'));
