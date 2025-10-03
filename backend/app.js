const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());

const jwt = require("express-jwt");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const PORT = 3001;

 app.use(function(req, res, next) {  
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Credentials', true);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
 });

const user = require("./routes/user");
app.use("/api/v1", user);
const admin = require("./routes/admin");
app.use("/api/v1", admin);
const site = require("./routes/site");
app.use("/api/v1", site);
const floor = require("./routes/floor");
app.use("/api/v1", floor);
const extension = require("./routes/extension");
app.use("/api/v1", extension);
const pin = require("./routes/pin");
app.use("/api/v1", pin);
const department = require("./routes/department");
app.use("/api/v1", department);
const timetable = require("./routes/timetable");
app.use("/api/v1", timetable);
const tableday = require("./routes/tableday");
app.use("/api/v1", tableday);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);

module.exports = app;