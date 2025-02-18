import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/Auth.controllers.js";
import { authMiddleware } from "../middlewares/protectRoute.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/checkAuth",authMiddleware, (req,res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
})

export default router;