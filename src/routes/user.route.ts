import express from 'express';
import { signIn, signUp, signOut } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/', signUp);
userRouter.put('/', signIn);
userRouter.put('/:userId', signOut);
