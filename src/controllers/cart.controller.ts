import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId)
      return res.status(400).send({
        message: 'Missing param: id or productId'
      });

    const addProduct = await prisma.cart.create({
      data: {
        productId: Number(productId),
        userId: Number(userId)
      }
    });
    return res.status(200).send({
      message: 'Product added',
      data: addProduct
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
};