// This gives us errors that carry their own HTTP status code.
class AppError extends Error {

    constructor(message, statusCode = 500 , errors = []){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = true;

        Error.captureStackTrace(this , this.constructor ); //TargetObject || function

    }
}

module.exports = {
    AppError
}
