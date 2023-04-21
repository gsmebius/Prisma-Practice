import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findFirst({
      where: { id: Number(productId) }
    });
    return res.status(200).send({
      product
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const produtcs = await prisma.product.findMany();
    return res.status(200).send({
      produtcs
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const newProduct = await prisma.product.create({
      data: { name, price }
    });
    return res.status(200).send({
      message: 'Product created successfully',
      newProduct
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
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
    return res.status(200).send({
      message: 'product updated successfully',
      productUpdate
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await prisma.product.delete({
      where: { id: Number(productId) }
    });
    return res.status(200).send({
      message: 'product deleted successfully'
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};
