import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SCRECT // Click 'View API Keys' above to copy your API secret
    });


    const uploadoncloudinary = async (localfilepath)=>{
        try {
            if(!localfilepath) return null;

            const response  = await cloudinary .uploader.upload(localfilepath,{
                resource_type : Auto 
            })
            console.log("Upload successful", response.url);
            return response.url;
            
        } catch (error) {
            fs.unlinkSync(localfilepath)
            
        }
        

    }

    export {uploadoncloudinary}