import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { tokenKey } from './helpers';

const prisma = new PrismaClient();
dotenv.config();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const removeBearer = authorization?.split(' ') || '';
    const token = removeBearer[1];
    const tokenExist = await prisma.user.findFirst({
      where: { tokenPass: token }
    });
    const access = tokenKey(token)
    if (String(access) && tokenExist) {
      next();
    } else {
      return res.status(400).send({
        message: 'You have to signin or signup first'
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};
