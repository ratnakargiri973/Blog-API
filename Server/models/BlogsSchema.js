import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';

var BlogSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: () => uuidv4(),
          },
          title: {
            type: String,
            required: true,
            minLength: [4, "Title should be atleast 4 characters"],
          },
          author: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
        },
        { timestamps: true }
    );

const Blogs = mongoose.model('blog', BlogSchema);
export default Blogs;