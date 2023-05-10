import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../utilities/models';

const prisma = new PrismaClient();

export const createOrder = async (req: CustomRequest, res: Response) => {

  try {
    const userId = Number(req.user?.id)

    if (!userId) return res.status(404).send({
          message: "Missing param id"
        });
      
    const getCart = await prisma.cart.findMany({ 
        where: { userId }, 
        include: { product: true } 
    });

    if (!getCart) return res.status(404).send({ 
        message: 'The order is empty' 
    });

    let total = 0
    const orderDetail = getCart.map(( cart ) => {
        const productId = cart.productId;
        const price = cart.product.price;
        total += price

        return { productId }
    });

    const createOrder = await prisma.order.create({
      data: { 
        userId, 
        total,
        orderDetail: {create : orderDetail}
        }
    });

    return res.status(200).send({
        data: createOrder,
        message: 'thanks for your purchase'
    });

  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      err
    });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {

    const { orderId } = req.params;
    
    if (!orderId) return res.status(404).send({
      message: "Missing param order id"
    });

    const order = await prisma.order.findFirst({ 
      where: { id: Number(orderId) },
      include: { orderDetail: { include: { product: true } } } 
    });

    return res.status(200).send({
      order
    });
    
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      err
    });
  }
};