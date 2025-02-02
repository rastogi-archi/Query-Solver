import User from "../models/User.models.js"

export const getAllUsers = async(req,res) =>{
    try {
        const userList = await User.find({});
        res.status(200).json({
            success: true,
            data: userList
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}