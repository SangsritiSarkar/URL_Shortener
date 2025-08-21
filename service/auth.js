//const sessionIdToUserMap = new Map(); --> StateFull Auth

const jwt = require("jsonwebtoken");
const secret = "Rim$123@";

//Statefull auth
/*function setUser(id, user){
    sessionIdToUserMap.set(id,user);
}
    
function getUser(id){
    return sessionIdToUserMap.get(id);
}*/

//Create tokens
function setUser(user){
    const payload ={
        _id: user._id,
        email: user.email,
        role: user.role, 
    }
    return jwt.sign(payload,secret);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
};