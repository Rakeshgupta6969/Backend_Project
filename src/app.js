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


export default app;