import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../utilities/models';

const prisma = new PrismaClient();

export const addToCart = async (req: CustomRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const userId = Number(req.user?.id)

    if (!productId || !userId)
    return res.status(400).send({
      message: 'Missing param: id or productId'
    });

    const addProduct = await prisma.cart.create({
      data: {
        productId: Number(productId),
        userId
      }
    });
    return res.status(200).send({
      message: 'Product added',
      data: addProduct
    });
  } catch (err) {

  }
};

export const removeToCart = async (req: CustomRequest, res: Response) => {
  try {

    const { productId } = req.params;
    const userId = Number(req.user?.id)

    if (!productId || !userId)
    return res.status(400).send({
      message: 'Missing param: id or productId'
    });

    const cart = await prisma.cart.findFirst({
      where: { productId: Number(productId), userId }
    });

    if (!cart)
    return res.status(400).send({
      message: 'that product doesnt exist in your cart'
    });

    await prisma.cart.delete({
      where: { id: Number(cart?.id) }
    });
    return res.status(200).send({
      message: 'Product deleted'
    });
  } catch (err) {
    return res.status(500).send({ 
      message: "ups, server error",
      err 
    });
  }
};

export const getCart = async (req: CustomRequest, res: Response) => {
  try {
    const userId = Number(req.user?.id);

    if (!userId) {
      return res.status(404).send({
        message: "Missing param id"
      })
    }
    
    const cartUser = await prisma.cart.findMany({
      where: { userId },
      include: { product: true }
    });

    if (!cartUser) {
      return res.status(404).send({
        message: "your cart is empty"
      })
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    const nameUser = user?.name

    res.status(200).send({
      user: nameUser,
      cartUser
    });

  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      err
    });
  }
};