import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from '../controllers/blogsController.js';
import upload from '../middleware/Multer.js';
import { protectedRoute } from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/post/blog",protectedRoute, upload.single("image"),createBlog);
blogRouter.get('/get/allBlogs', getAllBlogs);
blogRouter.get('/get/blog/:id', getSingleBlog);
blogRouter.put('/update/blog/:id',protectedRoute, updateBlog);
blogRouter.delete('/delete/blog/:id',protectedRoute, deleteBlog);

export default blogRouter;