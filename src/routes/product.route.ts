import express from 'express';
import {
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct
} from '../controllers/product.controller';

import { verifyToken } from '../utilities/middlewere';

export const productRouter = express.Router();

productRouter.get('/', verifyToken, getProducts);
productRouter.get('/:productId', verifyToken, getProductById);
productRouter.post('/', verifyToken, createProduct);
productRouter.put('/:productId', verifyToken, updateProduct);
productRouter.delete('/:productId', verifyToken, deleteProduct);
