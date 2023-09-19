const mongoose = require("mongoose");
const     ObjectId =  mongoose.Schema.ObjectId;





const ProjectSchema = new mongoose.Schema({
    
   
   
   userId : { type : ObjectId, ref: 'User' },
  
    name : {
        type : String,
        required : true,
    },

    desc : {
        type : String ,
        max : 500
    }
  ,
    employees : [ { type : ObjectId, ref: 'Employee' }],

    tasks : [ { type : ObjectId, ref: 'Task' }]

   
  
}, {timestamps : true})

module.exports = mongoose.model("Project", ProjectSchema)