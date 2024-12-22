import express from 'express';
import { protectedRoute } from '../middleware/auth.js';
import { addComment, deleteComment, getComments, updateComment } from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.post("/post/comment", protectedRoute, addComment);
commentRouter.get('/get/comments', getComments);
commentRouter.put('/update/:id', protectedRoute, updateComment);
commentRouter.delete('/delete/:id', protectedRoute, deleteComment);

export default commentRouter;