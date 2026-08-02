const { errorResponse } = require('../utils/apiResponse');
// (res , statusCode , message , errors = [])
const errorHandler =  (err , req , res , next )=>{
   
    // console.error("This is err.stack" + err.stack);
    console.log("This is err" + err);

    const error = err.errors || [];
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal server error.'
    
    return errorResponse(res , statusCode , message , error);
}


module.exports = {
    errorHandler
}

