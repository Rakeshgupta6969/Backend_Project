import { Router } from "express";
import { registerUser } from "../Controllers/user.Controller.js";
import { upload } from "../Middlewares/multer.Middlewares.js";

const userRouter = Router();

  userRouter.route("/register").post(
    
      upload.fields(  // thi is the injection of the multer middleware for the handling the file upload in the registration process, we are using the fields method to handle multiple files with different field names.
      
        [
        
            {
             name:"avatar",
             maxCount:1
            },
            {
              name:"coverImage",
             maxCount:3
            }


        ]

      ),
    registerUser

);

export  default userRouter;