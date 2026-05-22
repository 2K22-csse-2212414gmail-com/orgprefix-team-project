//         next();
//         return;
//     }
//const { get } = require("mongoose");
const { validatekey } = require("../services/auth");//importing ve file from shukla3 folder
function checkAuthentication(req,res,next){//[AUTHENTICATION MIDDLEWARE]
    const tokenCookie=req.cookies?.token;
    req.user=null;
    if(!tokenCookie) return next();
    const token=tokenCookie;
    const user=validatekey(tokenCookie);
    req.user=user;
    // const shuklaId=req.cookies?.token;
    //authorisation header validation and user authentication process
   // const shuklaId=req.cookies?.token;
//     if(!shuklaId) return next();
//     req.user=null;
//     const vs=shuklaId;

//     // const authorisationHeader=req.headers["Authorization"];
//     // req.user=null;
//     // if(!authorisationHeader || !authorisationHeader.startsWith("Bearer")
//     // )
// //return next();

// //const token=authorisationHeader.split("Bearer")[1];//"Bearer [23u12j3n12j3n12j3n12j3n]"
// const user=getVedant(vs);//trimming the token to get user session id
// req.user=user;
return next();//code sgregation
//authorisation header validation and user authentication process
}//implementation authethciation of logic in aa nodejs route
function restrictTo(roles=[]){//[AUTHORIZATION MIDDLEWARE]
    //roles is array of roles allowed to access the route
    //roles param can be single role string also 
    //would redirect to login page if not authenticated after checking req.user
    //routing of normal restrict before checking middkleware processing the database
return function(req,res,next){
    if (!req.user)
        return res.redirect("/visited");
    if(!roles.includes(req.user.role))
        return res.send("Unauthorized" );
    return next();}}
//    return function(req,res,next){
//     if(!req.user){
//         return res.redirect("/visited");
//     }
//     if(!shuklas.includes(req.user.shukla)){
//         return res.redirect("/visited");
//         return res.end("Yourare not vedang");
//     }   
module.exports={checkAuthentication,restrictTo}//