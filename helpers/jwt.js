const expressJWT = require("express-jwt")
function authJwt(){
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJWT({
        secret,
        algorithms:["HS256"],
        isRevoked:isRevoked
    })
}

module.exports=authJwt