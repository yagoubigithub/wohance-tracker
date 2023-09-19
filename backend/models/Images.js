const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.ObjectId;

const ImageSchema = new mongoose.Schema({
  
    name : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },

    type : {
        type : String,
        required : true,
        default : "icon"
    },
  
}, {timestamps : true})

module.exports = mongoose.model("Image", ImageSchema)