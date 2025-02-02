import Post from "../models/Post.models.js"

export const createPost = async(req,res) => {
    const {query, description, phone, category, priority, file} = req.body;
    try {
        if(String(phone).length < 10){
            return res.status(400).json({
                success: false,
                message: "Provide a correct phone number"
            })
        }
        const newPost = new Post({
            query,
            description,
            phone,
            category,
            priority,
            file
        })
        await newPost.save();
        res.status(200).json({
            success: true,
            message: "Post created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const fetchAllPosts = async(req,res) => {
    try {
        const listOfPosts = await Post.find({});
        res.status(200).json({
            success: true,
            data: listOfPosts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const editPost = async(req,res) => {
    const {id} = req.params;
    const {
        query,
        description,
        phone,
        priority,
        file
      } = req.body;
    try {
        let findPost = await Post.findById(id);
        if(!findPost){
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }
        findPost.query = query || findPost.query;
        findPost.description =  description || findPost.description;
        findPost.phone = phone || findPost.phone;
        findPost.priority = priority || findPost.priority;
        findPost.file = file || findPost.file;

        await findPost.save();
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: findPost
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const deletePost = async(req,res) => {
    const {id} = req.params;
    try {
        const findPost = await Post.findById(id);
        if(!findPost){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}