const express = require("express");
const router = express.Router();
const path = require('path');
const Employee = require("../models/Employee");




const Image = require("../models/Images")
const Screenshot = require("../models/Screenshot")


router.post("/screenshot/:employeeId"   ,  async (req, res ) => {


  const newScreenshot  = new Screenshot({...req.body , employeeId : req.params.employeeId})
 try {
     
  newScreenshot.save(async (err , screenshot)=>{

    
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      const employee  =  await Employee.findOneAndUpdate({_id : req.params.employeeId} ,  {$push : {
        screenshots : newScreenshot._id
      }})
     
     
     });
    return  res.status(200).json({success :  true})
 } catch (err) {
   console.log(err)
     return res.status(500).json(err)
 }



})

router.get("/screenshot/task/:taskId"   ,  async (req, res ) => {
  try {
    const screenshots = await Screenshot .find({taskId : req.params.taskId}  ).populate([{
      path : "employeeId",
      model : "Employee"
    } , {
      path : "taskId",
      model :  "Task"
    }]);
    res.status(200).json(screenshots );
  } catch (err) {
    res.status(500).json(err);
  }
})


router.post("/upload_icon/:employeeId"   ,  async (req, res ) => {
 // console.log(__dirname,req.body , req.query , req.params)
 


 
 const newImage  = new Image({...req.body , employeeId : req.params.employeeId})
 try {
     
     newImage.save(async (err , image)=>{

    
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      const employee  =  await Employee.findOneAndUpdate({_id : req.params.employeeId} ,  {$push : {
        images : newImage._id
      }})
     
     
     });
    return  res.status(200).json({success :  true})
 } catch (err) {
   console.log(err)
     return res.status(500).json(err)
 }




});



router.get("/upload_icon" , async (req, res ) => {
  // console.log(__dirname,req.body , req.query , req.params)
   
  try {
    const project = await Image .find(  );
    res.status(200).json(project );
  } catch (err) {
    res.status(500).json(err);
  }
 });
 
 

module.exports = router;