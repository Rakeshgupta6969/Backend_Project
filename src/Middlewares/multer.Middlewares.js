import multer from "multer";


const storage = multer.diskStorage({ // for the save and not overflow of the memory we use the diskStorage.
  destination: function (req, file, cb) { // here cb is nothing but it is a callback.
    cb(null, "../../Public/temp")
  },
  filename: function (req, file, cb) {
  
    cb(null, file.originalname)
  }
})

 export const upload = multer(
    { 
      storage,
     }
)