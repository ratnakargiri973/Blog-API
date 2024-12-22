import express from 'express';
import { login, logout, register } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/add/user', register);
userRouter.post('/login/user', login);
userRouter.post('/logout', logout)

export default userRouter;