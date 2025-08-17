const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDb } = require("./connection");
const PORT = 8001;

const app = express();

connectToMongoDb("mongodb://127.0.0.1:27017/short-url");
app.use(express.json());

app.use("/url",urlRoute);

app.listen(PORT, ()=>console.log(`Server started at Port: ${PORT}`));
