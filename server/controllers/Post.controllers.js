import Post from "../models/Post.models.js"
import { uploadOnCloudinary } from "../utils/ImageUploader.js";

export const createPost = async(req,res) => {
    try {
        const {query, description, phone, category, priority} = req.body;
        let fileUrl = null;

        if(String(phone).length < 10){
            return res.status(400).json({
                success: false,
                message: "Provide a correct phone number"
            })
        }
        if (req.file) {
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            if (!uploadResponse.success) {
                return res.status(500).json({ success: false, message: "File upload failed" });
            }
            fileUrl = uploadResponse.data.secure_url;
        }

        const newPost = new Post({
            query,
            description,
            phone,
            category,
            priority,
            file: fileUrl
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
        priority
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
        await Post.findByIdAndDelete(id);
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