import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getProductById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const product = await prisma.product.findFirst({
        where: { id: Number(productId) },
      });
  
      return res.status(200).send({ product });

    } catch (e) {
      return res.status(500).send({
        message: 'ups, server error',
        error: e
      });
    }
  };
  
  export const getProducts = async (req: Request, res: Response) => {
    try {
      const produtcs = await prisma.product.findMany();

      return res.status(200).send({ produtcs });

    } catch (e) {
      return res.status(500).send({
        message: 'ups, server error',
        error: e
      });
    }
  };
  
  export const createProduct = async (req: Request, res: Response) => {
    try {
      const { name, price } = req.body;

      await prisma.product.create({
        data: { name, price }
      });
  
      res.status(200).send({
        message: 'Product created successfully',
        newProduct: { name, price }
      });
    } catch (e) {
      return res.status(500).send({
        message: 'ups, server error',
        error: e
      });
    }
  };
  
  export const updateProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const { name, price } = req.body;
  
      const productUpdate = await prisma.product.update({
        where: { id: Number(productId) },
        data: { name, price }
      });
  
      res.status(200).send({
        message: 'product updated successfully',
        productUpdate
      });

    } catch (e) {
      return res.status(500).send({
        message: 'ups, server error',
        error: e
      });
    }
  };
  
  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
  
      await prisma.product.delete({
        where: { id: Number(productId) }
      });
  
      res.status(200).send({
        message: 'product deleted successfully'
      });
    } catch (e) {
      return res.status(500).send({
        message: 'ups, server error',
        error: e
      });
    }
  };