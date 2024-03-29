import {v2 as cloudnary} from 'cloudinary'
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath)=>{ 
    try {
        if (!localFilePath) return null;
        //upload the file to cloudinary
        const response = await cloudnary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        //File has been successfully uploaded
        console.log("File has been successfully uploaded to cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the localy saved temporary file as the upload operation got failed

    }
}

export {uploadOnCloudinary};