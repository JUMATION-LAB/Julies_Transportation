const multer = require('multer')

const storage = multer.memoryStorage();//ells Multer to temporarily hold the uploaded image in RAM rather than writing it to your computer's disk.

const uploadImage = multer({
    storage, 
    limits: {
        filesize: 5 * 1024 * 1024, //Limits an image to 5MBs     
        files: 1 //limits the request to one uploaded file.
    }
})





module.exports = { uploadImage };
