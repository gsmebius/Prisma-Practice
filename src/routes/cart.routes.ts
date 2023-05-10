import express from 'express';
import {
  addToCart,
  removeToCart,
  getCart
} from '../controllers/cart.controller';

import { verifyToken } from '../utilities/middlewere';
export const cartRouter = express.Router();

cartRouter.get('/', verifyToken, getCart);
cartRouter.post('/:productId', verifyToken, addToCart);
cartRouter.delete('/:productId', verifyToken, removeToCart);
