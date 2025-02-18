import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return {
                success: false,
                message: "Provide an image"
            }
        }
        const uploadResult = await cloudinary.uploader
            .upload(
                localFilePath, {
                resource_type: "auto"
            }
            )
        console.log("file is uploaded on cloudinary", uploadResult.url);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return {
            success: true,
            message: "File uploaded successfully",
            data: uploadResult
        };
    } catch (error) {   
        console.error("Cloudinary Upload Error:", error);

        // Delete file only if it exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return {
            success: false,
            message: "Internal server error"
        };
    }
}