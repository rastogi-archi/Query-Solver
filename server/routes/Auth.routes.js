import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/Auth.controllers.js";
import { authMiddleware } from "../middlewares/protectRoute.middlewares.js";
import User from "../models/User.models.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/checkAuth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "User not found" });
  }
});

export default router;