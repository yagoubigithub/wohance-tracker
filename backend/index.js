const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const morgan = require("morgan");
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator")
var bodyParser = require('body-parser')

dotenv.config()

const port = process.env.PORT || 4005;



const app = express();

//import routes

const userRoutes = require("./routes/users")
const projectRoutes = require("./routes/projects")
const taskRoutes = require("./routes/tasks")
const employeeRoutes = require("./routes/employees")
const timeRoutes = require("./routes/times")
const indexRoutes = require("./routes/")


//midelwares
app.use(cors({ origin: true }));

app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))

app.use(cookieParser());
app.use(expressValidator())

app.use(morgan("common"));




const server = http.createServer(app);

const io = socketIo(server , {
    cors: {
        origin: '*',
      }
});


mongoose.connect(process.env.MONGO_URL,{

    useNewUrlParser : true
}).then(()=>{
    console.log("database connected")
})


io.on("connection", (socket) => {
  console.log("New client connected");
 
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  
  });

});
app.use(function(req, res, next) {
  req.io = io;
  next();
});


//routes midelware


app.use("/api",indexRoutes)
app.use("/api/users",userRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api/employees",employeeRoutes)
app.use("/api/times",timeRoutes)



server.listen(port, () => console.log(`Listening on port ${port}`));