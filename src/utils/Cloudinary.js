import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


cloudinary.config({

   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async (localFilePath) =>{  // through this method we try to upload the our local file to  the cloudinary.
       
    try{
        if(!localFilePath) return null;
        
         // now upload the file on the cloudinary.

        const response =   await  cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
         });


         // now our localFilePath is uploaded on the cloudinary.
         console.log("LocalFile is uploaded on the cloudinary",response.url);

         return response;


    }
    catch(error){
           
        console.log("here is the main error in cloudinary:",error);
         fs.unlinkSync(localFilePath); // here remove the locally saved file if the upload got failed due the some reason.
         return null;
    }


} 

export {uploadOnCloudinary};

