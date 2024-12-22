import Blogs from "../models/BlogsSchema.js";
import { cloudinaryUploader } from "../utils/Cloudinary.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
    try {
        const result = await cloudinaryUploader(req.file.buffer);
        const {title, content, category} = req.body;

        const blogToPost = new Blogs({
            title,
            author:req.user.name,
            content,
            image: result.secure_url,
            category
        });

        await blogToPost.save();
        res.status(201).send({message: "Blog added successfully"});
    } catch (error) {
        res.status(500).send({error: error});
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        let query = {}; 


        if(req.query.author) {
            query.author = { $regex: new RegExp(req.query.author, "i") };
        }
       
        if(req.query.category) {
            query.category = { $regex: new RegExp(req.query.category, "i") };
        }

        if(req.query.title) {
            query.title = { $regex: new RegExp(req.query.title, "i") };
        }


        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 4;
        const skip = (page - 1) * limit;

        const allBlogs = await Blogs.find(query).skip(skip).limit(limit);

        const totalCount = await Blogs.countDocuments(query);


         res.send({
                    allBlogs,
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
             });
    } catch (error) {
        res.status(500).send({error: error});
    }
}

export const getSingleBlog = async (req, res) => {
    const {id} = req.params;

    try {
       if(!id){
        return res.status(400).send({message: "You must specify a id of the blog"});
       };
       
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: "Given ID is not in proper format"});
       }

       const blog = await Blogs.findById(id);
    
       
       if(!blog){
        return res.status(404).send({message: "No Blog is found with that ID"});
       };

       res.status(200).send(blog);

    } catch (error) {
        res.status(500).send({error: error});
    }
}

export const updateBlog = async (req, res) => {
    const {id} = req.params;
    const {title, author, content, category} = req.body;

    try {
        if(!id){
            return res.status(400).send({message: "You must specify a Blog ID"});
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({message: "Given ID is not in proper format"});
        }

        const updateToBlog = await Blogs.findByIdAndUpdate(id, {
             title,
             author, 
             content,
             category
        });

        if(!updateToBlog){
            return res.status(404).send({message: "No Blog is found with that ID"});
           };
    
           res.status(200).send(updateToBlog);
    } catch (error) {
        res.status(500).send({error: error});
    }
}

export const deleteBlog = async (req, res) => {
    const {id} = req.params;
 try {
    if(!id){
        return res.status(400).send({message: "You must specify a Blog ID"})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message: "The Book ID is not in proper format"});
    }

    const deletedBlog = await Blogs.findByIdAndDelete(id);

    if (!deletedBlog)
        return response
          .status(404)
          .send({ message: "No blog found with the given ID" });
  
      res.send({ message: "Blog with the given ID deleted" });
 } catch (error) {
      res.status(500).send({message: "Error deleting blog", error});
 }
   
}