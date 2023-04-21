import { Request, Response, request } from 'express';
import { PrismaClient } from '@prisma/client';
import { compare, encrypt, tokenKey } from './../utilities/helpers';
const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await encrypt(password);
    const registerUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    });
    const tokenSession = await tokenKey(registerUser.id)
    await prisma.user.update({
      where: { id: registerUser.id },
      data: { tokenPass: tokenSession }
    });
    return res.status(200).send({
      registerUser
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { email }
    });
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      });
    }
    const checkpass = await compare(password, String(user?.password));
    const tokenSession = await tokenKey(user?.id)
    const userUpdate = await prisma.user.update({
      where: { id: user?.id },
      data: { tokenPass: tokenSession }
    });
    if (!checkpass) {
      res.status(404).json({
        message: 'incorrect password'
      });
    }
    if (checkpass) {
      return res.status(200).send({
        userUpdate
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res.status(400).send({
        message: 'Missing param: id'
      });
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { tokenPass: '' }
    });
    return res.status(200).send({
      message: 'AccessToken was destroyed'
    });
  } catch (err) {
    return res.status(500).send({
      message: 'ups, server error',
      error: err
    });
  }
};
