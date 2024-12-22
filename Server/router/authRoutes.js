import express from 'express';
import { protectedRoute } from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.get('/auth/check', protectedRoute, (req, res) => {
    res.status(200).send({user: req.user, isAuthenticated: true});
})

export default authRouter;