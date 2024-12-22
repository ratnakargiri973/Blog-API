import Comment from "../models/commenSchema.js";

export const addComment = async (req, res) => {
        const {content, postId} = req.body;
    try {
        const comment = new Comment({
            content,
            post: postId,
            author: req.user.name
        });

        await comment.save();
        res.status(201).send({message: `${comment.author} has commented on your post`, comment});
    } catch (error) {
        res.status(500).send({message: "Error in commenting", error})
    }
}

export const getComments = async (req, res) => {
    try {
        const allComments = await Comment.find();
        res.status(200).send({message: "Success", allComments});
    } catch (error) {
        res.status(500).send({message: "Somthing Error is happening", error})
    }
}

export const updateComment = async (req, res) => {
    const {id} = req.params;
    try {
        const {content} = req.body;

         if(!id){
                    return res.status(400).send({message: "You must specify a Comment ID"});
                }
        
                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(400).send({message: "Given ID is not in proper format"});
                }

        const updateToComment = await Comment.findByIdAndUpdate(id,{
            content
        });

        if(!updateToComment){
            return res.status(404).send({message: "No Blog is found with that ID"});
           };

        res.status(201).send({message: "Updated Successfully", updateToComment});
    } catch (error) {
        res.status(500).send({message: "Error in updating comment", error})
    }
}

export const deleteComment = async (req, res) => {
    const {id} = req.params;
    try {

         if(!id){
                    return res.status(400).send({message: "You must specify a Comment ID"});
                }
        
                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(400).send({message: "Given ID is not in proper format"});
                }

       const deleteToComment = await Comment.findByIdAndUpdate(id);

        if(!deleteToComment){
            return res.status(404).send({message: "No Blog is found with that ID"});
           };

        res.status(201).send({message: "Deleted Successfully"});
    } catch (error) {
        res.status(500).send({message: "Error in deleting comment", error})
    }
}

