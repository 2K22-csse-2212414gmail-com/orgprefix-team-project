

const JWT = require("jsonwebtoken");
//nst { Profiler } = require("react");
const secretKey = "rive@123"; // Replace with your own secret key
function validateUser(user) {//createToken function to generate token for 
    const payload = {
        id: user._id,
        email: user.email,
       password: user.password,
        role: user.role
    };
    const token = JWT.sign(payload, secretKey, { expiresIn: "1h" });
     console.log("TOKEN GENERATED:", token)
    return token;
}
function validatekey(token){
    const payload=JWT.verify(token,secretKey);
    return payload;
}
module.exports={
    validateUser,
    validatekey
}//loose coupling for  and authentication logic so that we can use it in any file without worrying about the implementation details of vedant linking and authentication logic
//func
    //tion to validate the key for authentication

//function isVedantLinkingValid(vs) {//function to verify token for vedant linking of above token
//     const vedSh=JWT.verify(vs, secretKey);
//     return vedSh;
// }
// module.exports = {
//     vedantLinking,
//     isVedantLinkingValid
// }