import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = new Schema(
    {
     
    userName :{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true, // to remove the whitespace from the string 
        index:true // to make to able to search

    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },

    fullName:{
        type:String,
        required:true,
        index:true,
        trim:true

    },

    password:{
        type:String,
        required:[true,"password is required"],
        unique:true,
    },

    coverImage:{
        type:String,
       
    },

    avatar:{
       type:String, // URL from the cloudinary.
       required:true,
    },

    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video",
        },

    ],

    refreshToken:{
        type:String,
    }





    },{timestamps:true});

 

userSchema.pre("save" , async function (next){   // here we apply the concept of the middleware. and pre is also a middleware

     if(!this.isModified("password")) return next();  // this is all about the password encryption // changing the data into the database.


    this.password =  await bcrypt.hash(this.password,10);
     next();
})

userSchema.methods.isCorrectPassword = async function (password){  // here we verified the password stored in the database.
 
    return await bcrypt.compare(password,this.password);
}


 // now the concept of the generation of the token

 userSchema.methods.generateAccessToken = function(){
     
     
     return jwt.sign(
     {

          _id:this.id,
           email:this.email,
           userName:this.userName,
           fullName:this.fullName
      },
      
     process.env.ACCESS_TOKEN_SECRET,

      {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }

     )



 }  

  userSchema.methods.generateRefreshToken = function(){
          return jwt.sign(
        {

          _id:this.id,
         
       },
      
      process.env.REFRESH_TOKEN_SECRET ,

      {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY 
      }

      )
 }



 const User  = mongoose.model("User",userSchema);
 export {User}
