const mongoose = require("mongoose");

async function connectToMongoDb(url){
    return mongoose
        .connect(url)
        .then(()=> console.log("MongoDb Connected.."))
        .catch((err)=> console.log("Mongo error", err));
}

module.exports = {
    connectToMongoDb,
};