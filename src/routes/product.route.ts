import express from 'express';
import {
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct
} from '../controllers/product.controller';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/:userId', createProduct);
productRouter.put('/:userId/:productId', updateProduct);
productRouter.delete('/:userId/:productId', deleteProduct);