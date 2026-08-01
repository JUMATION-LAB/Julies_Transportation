
exports.errorHandler =  (err , req , res , next )=>{
    console.error(err.stack);
    console.log(err);

    res.status(500).json({ success: false,
        message: err.message || "Internal Server error" 
    })

    


}