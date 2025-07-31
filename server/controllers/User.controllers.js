import User from "../models/User.models.js"

export const getAllUsers = async (req, res) => {
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

export const getUserProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await User.findById(id);
        if (!findUser) {
            res.status(400).json({
                success: false,
                message: "No user found"
            })
        }
        res.status(200).json({
            success: true,
            data: findUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const editUserProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, phone, bio, image } = req.body;

  try {
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    findUser.username = username ?? findUser.username;
    findUser.email = email ?? findUser.email;
    findUser.phone = phone ?? findUser.phone;
    findUser.bio = bio ?? findUser.bio;
    findUser.image = image ?? findUser.image;

    await findUser.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: findUser,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
