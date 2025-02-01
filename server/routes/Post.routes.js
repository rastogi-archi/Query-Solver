import express from "express";
import { createPost, deletePost, editPost, fetchAllPosts } from "../controllers/Post.controllers.js";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/get", fetchAllPosts);
router.put(":id", editPost);
router.delete("/:id", deletePost);

export default router;