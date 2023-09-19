const Time = require("../models/Time");
const Task = require("../models/Task");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Timer = require("../models/Timer");

exports.create = async (req, res) => {
  const employeeId = req.params.employeeId;
  const taskId = req.params.taskId;

  
  const time = new Time({ ...req.body, employeeId });

  time.save( async (err, time) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    Task.findOneAndUpdate({
      _id : taskId
     } , {
       $push : {
         times : time._id
       }
     }).then( async ()=>{
      try {
        const times = await Time.find({ employeeId });
        res.status(200).json(times);
      } catch (err) {
        res.status(500).json(err);
      }
     })

   
  });
};

exports.createTimer = async (req, res) => {
  const employeeId = req.params.employeeId;


  console.log({ ...req.body, employeeId })
  
const timer = new Timer({ ...req.body, employeeId });

  timer.save( async (err, timer) => {
    console.log(err);
    if (err) {
      console.log(err)
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
  

    try {
      const timers = await Timer.find({ employeeId });
      res.status(200).json(timers);
    } catch (err) {
      res.status(500).json(err);
    }
   
  }); 
};

exports.getTimes = async (req, res) => {
  try {
    const times = await Time.find({ employeeId: req.params.employeeId });
    res.status(200).json(times);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getTimers = async (req, res) => {
  try {
    const timers = await Timer.find({ employeeId: req.params.employeeId });
    res.status(200).json(timers);
  } catch (err) {
    res.status(500).json(err);
  }
};
