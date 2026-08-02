const { errorResponse } = require('../utils/apiResponse');

const notFoundHandler = (req, res)=>{

    return errorResponse(
        res,
        404,
        `Route ${req.method} ${res.url} was not found.`,

    )
}

module.exports = {
    notFoundHandler
};
