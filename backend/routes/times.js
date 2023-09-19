const express = require("express");
const router = express.Router();

const { create, getTimes , createTimer  ,  getTimers } = require("../controllers/time");
const { requireSignin } = require("../controllers/user");



router.get("/:employeeId" , requireSignin ,  getTimes);
 
router.post("/timer/:employeeId" ,requireSignin ,  createTimer);
router.get("/timer/:employeeId" ,requireSignin ,  getTimers);
 router.post("/:employeeId/:taskId" ,requireSignin ,  create);

   
  
 

module.exports = router;