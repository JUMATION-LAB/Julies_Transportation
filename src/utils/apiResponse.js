
const succesResponse = (res, statusCode , message , data = ['null'])=>{
    return res.status(statusCode).json({
        success: true,
        message,
        data 
    })
};


const errorResponse = (res , statusCode , message , errors = [])=>{
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    })
};





module.exports = {
    errorResponse,
    succesResponse
}

