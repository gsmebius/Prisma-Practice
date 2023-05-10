import express from 'express';
import {
    createOrder,
    getOrder
} from '../controllers/order.controller';

import { verifyToken } from '../utilities/middlewere';
export const orderRouter = express.Router();

orderRouter.post('/', verifyToken, createOrder);
orderRouter.get('/:orderId', verifyToken, getOrder);