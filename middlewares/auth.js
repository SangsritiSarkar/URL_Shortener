const {getUser} = require("../service/auth");

function checkForAuthentication(req,res,next){
    /*  --> JWT Auth
    const authorizationHeaderValue = req.headers("authorization");
    req.user= null;
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) return next();
    const token = authorizationHeaderValue.split("Bearer")[1];
    const user = getUser(token);
    req.user = user;
    return next();*/ 
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if(!tokenCookie) return next();
    const token = tokenCookie;
    const user = getUser(token);
    req.user=user;
    return next();
}

function restrictTo(roles = []){
    return function (req,res,next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    };
}

/*
    async function restrictToLoggedInUserOnly(req,res,next){
    /*
    //Cookie mehod for browser
    const userId= req.cookies?.uid;
    */

    //Response method for any device
    /*
    const userId= req.headers['authorization'];
    if(!userId) res.redirect("/login");
    const token = userId.split("Bearer ")[1];  //"Bearer [23456677409gsgjk]"
    const user = getUser(token);
    if(!user) res.redirect("/login");

    req.user = user;
    next();
}


async function checkAuth(req,res,next){
    const userId= req.headers['authorization'];
    const token = userId.split("Bearer ")[1];  

    const user = getUser(token);


    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
};

*/

module.exports = {
    checkForAuthentication,
    restrictTo,
};
