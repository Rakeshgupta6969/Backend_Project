import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
      

    origin:process.env.CORS_ORIGIN,
    credentials:true


}))

app.use(express.json({limit:"20kb"})); // this is the limitation of data ,which user enter.
app.use(express.urlencoded({extended:true,limit:"20kb"})); // when the data is coming from the multiple URL,OR from the cross URL.
app.use(express.static("public")); // to store the file for the public access.
app.use(cookieParser()) // data from the browser to the server.
 

// import routs
import userRouter from "./routs/user.routs.js"; 

// now the rout declaration

app.use("/api/v1/users",userRouter); // here use act as the middleware and here we cannot write as app.get().
 
// above create URL like http://localhost:8000/api/v1/users/register .you can say this is the link of the URL,here /api/v1(version one),just 
// as the standard practice.
  

export default app;