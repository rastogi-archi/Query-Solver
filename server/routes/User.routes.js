import express from "express";
import { deleteUser, editUserProfile, getAllUsers, getUserProfile } from "../controllers/User.controllers.js";

const router = express.Router();
router.get("/getAllUsers", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.get("/profile/ :id" , getUserProfile);
router.put("/editProfile/:id", editUserProfile);

export default router;