import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

// ✅ Configure Cloudinary

    



// ✅ Debugging - Log environment variables
console.log("Cloudinary Config:", {
    cloud_name: process.env.CLOUD_NAME || "MISSING",
    api_key: process.env.CLOUD_API_KEY ? "✔ Loaded" : "MISSING",
    api_secret: process.env.CLOUD_API_SECRET ? "✔ Loaded" : "MISSING",
   

});

// ✅ Upload Function
const uploadoncloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) throw new Error("Local file path is missing");

        console.log("Uploading file:", localfilepath);

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto",
        });

        console.log("✅ Upload successful:", response.secure_url);

        // ✅ Delete the file after successful upload
        try {
            fs.unlinkSync(localfilepath);
        } catch (unlinkError) {
            console.warn("⚠️ Failed to delete local file:", unlinkError);
        }

        return response.secure_url;
    } catch (error) {
        console.error("❌ Cloudinary Upload Error:", error);

        // ✅ Ensure file is deleted even if upload fails
        if (fs.existsSync(localfilepath)) {
            try {
                fs.unlinkSync(localfilepath);
            } catch (unlinkError) {
                console.warn("⚠️ Failed to delete local file after error:", unlinkError);
            }
        }

        return null;
    }
};

export { uploadoncloudinary };
