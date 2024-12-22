import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectToDB } from './db/connection.js';
import userRouter from './router/userRoutes.js';
import blogRouter from './router/blogsRoutes.js';
import commentRouter from './router/commentRoutes.js';

const PORT = process.env.PORT;

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', blogRouter);
app.use('/api', commentRouter)


await connectToDB();
app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`);
})