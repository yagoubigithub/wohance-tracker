const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.ObjectId;

const ScreenshotSchema = new mongoose.Schema({
  
  
    image : {
        type : String,
        required : true,
    },
    taskId: { type: ObjectId, ref: "Task" , default : null },
    employeeId: { type: ObjectId, ref: "Employee" },
  
}, {timestamps : true})

module.exports = mongoose.model("Screenshot", ScreenshotSchema)