
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config  = require('../config/appConfig');



const generateAccessToken = (admin)=>{

    return jwt.sign(
        {
           id: admin.id,
        //    role: admin.role,
           
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn
        }

    );

};



const generateRefreshToken = (admin)=>{

    return jwt.sign(
        {
            id:admin.id
        },
        config.jwt.refreshSecret,
        {
            expiresIn: config.jwt.refreshExpiresIn
        }
    );

}


module.exports ={
    generateAccessToken,
    generateRefreshToken
}

