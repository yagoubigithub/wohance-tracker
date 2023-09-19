const mongoose = require("mongoose");

const crypto = require('crypto');
const uuidv1 = require('uuid').v1;
const     ObjectId =  mongoose.Schema.ObjectId;

const UserSchema = new mongoose.Schema({
  
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    }
    // username, email, password, phone, address, gender
  
,
    hashed_password : {
        type : String ,
        required : true,
       
    },
    phone : {
        type : String ,
       
    },
    address : {
        type : String ,
       
    },
    gender : {
        type : String ,
       
    },
    salt : String,
    
    role : {
        type : Number,
        default : 0
    }
}, {timestamps : true})


// vertual field

UserSchema.virtual('password')
.set(function(password){

    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

UserSchema.methods = {


    authenticate  : function(PlainText){

        return this.encryptPassword(PlainText) === this.hashed_password
    },
    encryptPassword : function(password){

        if(!password) return "";
        try {
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest("hex");
            
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", UserSchema)