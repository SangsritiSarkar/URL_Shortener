const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { connectToMongoDb } = require("./connection");
const PORT = 8001;

const app = express();

connectToMongoDb("mongodb://127.0.0.1:27017/short-url");
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.use("/url",urlRoute);
app.use("/", staticRoute);


app.listen(PORT, ()=>console.log(`Server started at Port: ${PORT}`));
