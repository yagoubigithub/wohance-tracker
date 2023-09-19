const Task = require("../models/Task");
const Project = require("../models/Project");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { populate } = require("../models/Task");

exports.create = (req, res) => {
  const projectId = req.params.projectId;

  const tasks = Task.find({
    projectId: req.params.projectId,

    status: req.body.status,
  }).then(() => {
    const index = tasks.length;

    const task = new Task({ ...req.body, projectId, index });

    task.save((err, task) => {
      console.log(err);
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }

      Project.findOneAndUpdate({
        _id : projectId
       } , {
         $push : {
           tasks : task._id
         }
       }).then(()=>{
        res.status(200).json({
          task,
        });
       })
      
    });
  });
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getTask = async (req, res) =>{
  try {
    const task = await Task.findById( req.params.taskId ).populate([{
      path : "times",
      model : "Time",
      populate : {
        path : "employeeId",
        model : "Employee",
        populate : {
          path : "images",
          model : "Image",
        }
      }
     
    } , {
      path : "projectId",
      model : "Project"
    }]);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  } 
}


exports.getTaskWithoutPopulate = async (req, res) =>{
  try {
    const task = await Task.findById( req.params.taskId );
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  } 
}

exports.UpdateStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
      },
      { status: req.body.status, index: req.body.index } , 
      {new: true}
    );

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};
