
const Employee = require("../models/Employee")
const {errorHandler} = require('../helpers/dbErrorHandler')

const jwt = require("jsonwebtoken") //to generate sign token
const expressJwt = require("express-jwt") // for authorization


exports.create = (req, res) => {
   const userId = req.params.userId

   const employee = new Employee({...req.body, userId});
  
   employee.save((err,employee)=>{
      if(err) {
         return res.status(400).json({
            err : errorHandler(err)
         })
      }

      employee.salt = undefined;
      employee.hashed_password = undefined;

      res.status(200).json({
         employee 
      })

   })
}

exports.getEmployees =  async (req, res)=>{
    try {
   
        const employee = await Employee .find({userId : req.params.userId} , "-hashed_password").populate({
           path : "images",
           model : "Image"
        })
        res.status(200).json(employee );
      } catch (err) {
         console.log(err)
        res.status(500).json(err);
      }
}

exports.getEmployee =  async (req, res)=>{
    try {
   
        const employee = await Employee .findOne({_id : req.params.employeeId} , "-hashed_password").populate({
           path : "images",
           model : "Image"
        })
        res.status(200).json(employee );
      } catch (err) {
         console.log(err)
        res.status(500).json(err);
      }
}


exports.signin = (req, res) => {


//find employee based on email
const {email, password  , userId} = req.body;

Employee.findOne({userId ,  email}, (err, employee)=>{
   if(err || !employee){
      return res.status(400).json({
         error : "employee with that Admin id or email doesn't exist "
      })
   }

   //if user is found make sure the email and password match

 
   // create authenticate method in employee model
   console.log(employee)

   if(!employee.authenticate(password)){
      return res.status(401).json({
         error : "Email and password don't match"
      })

   }
   // generate a signed token with employee id and secret
   const token  = jwt.sign({_id : employee._id}, process.env.JWT_SECRET);

   //pressist the token as 't' in cookiewith ewpiry date
   res.cookie("t", token, {expire : new Date() + 9999})
   // return token and employee to frontend client

   const {_id, name,email} = employee;
   return res.json({token, employee: {_id,name,email , userId} })





})

}