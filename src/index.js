// require('dotenv').config({path:'./env'});

import dotenv from "dotenv";
import connectDB from "./Database/index.js";
import app from "./app.js";

  dotenv.config({
   path:"./env"

  })



 
  

 // here we try to connect the database with the firstApproach.
 
 connectDB()

  .then(() =>{
      app.listen(process.env.PORT || 8000,() =>{
        console.log(`server is running at port:${process.env.PORT}`);
      })

       app.on("error",(error) =>{ // this is nothing but an listener which show error when database is not connected.
            console.log("error",error);
            throw error;
      })
 })
 .catch((error) =>{
      console.log("error is here:",error);
 })





  // this is the second approach to connect the database
 
 /*(async() =>{
   
    try{
      await mongoose.connect(`${process.env.MONGODB_URI}/${ DATABASE_NAME}`)

      app.on("error",(error) =>{ // this is nothing but an listener which show error when database is not connected.
            console.log("error",error);
            throw error;
      })

     app.listen(process.env.PORT,()=>{
        console.log(`app is running on the port ${process.env.PORT}`);
     })

    }
    catch(error){
        console.log("error is this:",error);
        throw error;
    }



})() */

 // this just like a function,this is called "effi"