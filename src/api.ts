import express from 'express';
import { router } from './router';

export const api = express();

api.use(express.json());

api.use(router);