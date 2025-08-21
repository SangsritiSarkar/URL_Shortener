const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDb } = require("./connection");

const {checkForAuthentication, restrictTo} = require("./middlewares/auth");

//Routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url");

//Middleware plugins
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.use("/url", restrictTo(["NORMAL", "ADMIN"] ) ,urlRoute);
app.use("/user",  userRoute);
app.use("/", staticRoute);


app.listen(PORT, ()=>console.log(`Server started at Port: ${PORT}`));
