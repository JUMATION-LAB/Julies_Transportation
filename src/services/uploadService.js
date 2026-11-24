const { randomUUID } = require('node:crypto');
const { supabase } = require('../config/supabase');
const { AppError } = require('../utils/AppError');


// 2. file.buffer
// This contains the image bytes captured by Multer.
const uploadImage = async (file)=>{
    if(!file){
        throw new AppError('Image is required.' , 400 );
    }


    // These check the file's signature bytes. This is safer than trusting only the filename or MIME type provided by the browser.
    const isPng  = file.buffer.subarray(0 , 3).equals(
        Buffer.from([0xFF, 0xD8, 0xFF])
    );

    const isJpeg = file.buffer.subarray(0 , 8).equals(
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]) 
    );



    if(!isJpeg && !isPng ) throw new AppError('Only jpeg and png images are allowed', 400);

    const extension = isJpeg ? 'jpg' : 'png';
    const contentType = isJpeg ? 'image/jpeg' : 'image/png';
    const filePath = `gallery/${randomUUID()}.${extension}`;
    
    const { data , error } = await supabase.storage
    .from('julie-images')
    .upload( filePath, file.buffer , {
        contentType,
        upsert: false //Prevents overwriting an existing object at the same path.
    });

    if(error) throw error;

    const {data : publicData } = supabase.storage
    .from('julie-images')
    .getPublicUrl(data.path);//Constructs the public URL for the stored image.

    return {
        path: data.path,
        image_url: publicData.getPublicUrl
    };

};


module.exports = { uploadImage }
