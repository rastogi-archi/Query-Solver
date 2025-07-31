import express from "express";
import { editUserProfile, getAllUsers, getUserProfile } from "../controllers/User.controllers.js";

const router = express.Router();
router.get("/getAllUsers", getAllUsers);
router.get("/profile/ :id" , getUserProfile);
router.put("/editProfile/:id", editUserProfile);

export default router;