import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req,res) =>{
      
      // steps involves in the performing the registration.

      // step 1: take data from the fronted 
      // step 2: check it for the validation, email is valid or not,password is valid or not ,or not empty.
      // step 3: check the user is already exist or not ,by useName or the by the email,
      // step 4: check for the video and avatar and push them into the cloudinary
      // step 5: take object from the cloudinary  in the form of the string 
      // step 6: push all the data onto the database 
      // step 7: remove password and refresh token field from the response.
      // step 8: check verification or creation 
      // step 9: return response

      // taking the data from the frontend

      const {userName,fullName,password,email} = req.body;

      console.log("email is",email);

      // if(fullName === ""){ now like this we can for the all field ,but below some advance javascript method to the all the field.
     //       throw new ApiError(400,"fullName is required");
      // }
      

      // step 2: data validation
      if(
       [userName,fullName,password,email].some((ele) =>
          !ele  ||   ele?.trim() == "" // is any field is undefined.
           
       )
       
      ){
          throw new ApiError(400,"all field are required to field");
      }

      // step 3: now  check user is allReady exist or not.
      
   const existedUser =   await  User.findOne( // this check every field in the or that the required field is available in the data base or not
            {
                  $or : [{ userName },{ email }]
            }
      )

      if(existedUser){
            throw new ApiError(409," User allReady exists with the same credential ");
      }
      
    

    // here now case of  the avatar and video file

//    const avatarLocalPath =  req.files?.avatar[0]?.path; 
   const avatarLocalPath = req.files?.avatar?.[0]?.path; // you can say it is the inclusion of the middleware during the file uploading.  
   const coverImageLocalPath  =  req.files?.coverImage?.[0]?.path;


   if(avatarLocalPath){
      throw new ApiError(400,"Avatar is required to full fill the requirement")
   }
      
   
   // now upload the avatar ans coverImage on the cloudinary.

   const avatar =    await  uploadOnCloudinary(avatarLocalPath); // during the upload of the file it take time
   const coverImage = await  uploadOnCloudinary(coverImageLocalPath);// again it take some time to  upload.
      
      if(!avatar){
            throw new ApiError(400," Avatar is required to full fill requirement ")
      }


      // now upload this avatar and coverImage to url.
       const user = await  User.create({
             fullName,
             avatar:avatar?.url || "",
             coverImage:coverImage?.url || "",
             email,
             password,
             userName :userName.to_Lowercase(),
      })

      // now we created the user but we want tp verify ,if user is success fully created or not 
       
   const createdUser =   await User.findById(user._id).select(

        "-password -refreshToken"

   );


   if(!createdUser){
      throw new ApiError(500,"something went wrong while user registration ")
   }

   // now step of the sending response 


   return res.status(201).json(
      new ApiResponse(200,createdUser,"User registered Successfully ")
   )


});


export {registerUser};