import jwt from "jsonwebtoken"

export const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({
            success: false,
            message : "Unauthorised user"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message : "Internal server error"
        })
    }
}