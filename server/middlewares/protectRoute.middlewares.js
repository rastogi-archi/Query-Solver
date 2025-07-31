import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log("cookies" ,req.cookies);
    if (!token) {
        return res.status(200).json({
            success: false,
            user: null,
            message: "Unauthorized user"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            user: null,
            message: "Invalid or expired token"
        });
    }
}