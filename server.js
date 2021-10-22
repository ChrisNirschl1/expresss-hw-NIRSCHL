const express = require("express");
const app = express();
const PORT = process.env.PORT ||3000;
const htmlRoutes = require("./routes/htmlRoutes");
const donutRoutes = require("./routes/donutRoutes");
const logReq = require("./middleware/logRequest")

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))