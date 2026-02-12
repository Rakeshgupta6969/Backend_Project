
const asyncHandler = (requestHandler) =>{
    return (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((error) => next(error))
    }
}


export {asyncHandler};


// const asyncHandler = (fn) => async(req,res,next) =>{ // this is the hired order function which accept the function as a parameter.

//     try{
//        await fn(req,res,next);
//     }
//     catch(error){
//          res.status(error.code || 500).json({
//               success:false,
//               message:error.message
//          })
//     }

// }