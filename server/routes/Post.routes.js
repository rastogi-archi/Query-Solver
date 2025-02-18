import express from "express";
import { createPost, deletePost, editPost, fetchAllPosts } from "../controllers/Post.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post("/createPost",upload.single("image"), createPost);
router.get("/get", fetchAllPosts);
router.put("/edit/:id", editPost);
router.delete("/delete/:id", deletePost);

export default router;