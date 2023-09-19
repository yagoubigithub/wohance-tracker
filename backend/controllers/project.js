
const Project = require("../models/Project")
const {errorHandler} = require('../helpers/dbErrorHandler');
const Task = require("../models/Task");



exports.create = (req, res) => {
   const userId = req.params.userId

   const project = new Project({...req.body, userId});
  
   project.save((err,project)=>{
      if(err) {
         return res.status(400).json({
            err : errorHandler(err)
         })
      }


      res.status(200).json({
         project 
      })

   })
}

exports.getProjects =  async (req, res)=>{
    try {
   
       Project .find({userId : req.params.userId} , (err, projects) => {

        const myProjects = []
        let count = 0
       new Promise((resolve , reject)=>{

        projects.map((p , index)=>{

          Task.find({projectId : p._id}).then(tasks=>{
            myProjects.push({...p._doc, tasks})
            count++;
         
            if(count === projects.length ) resolve()

          })
        })

       }).then(()=>{
        
        res.status(200).json(myProjects );
       })
       

        } ).populate("employees" ,  "-salt -hashed_password")
      

  
       
    
      } catch (err) {
    
        res.status(500).json(err);
      }
}


exports.setEmployeesInProject = async (req, res)=>{
   try {
    const projectId = req.params.projectId;

    const project = await Project.findOneAndUpdate(
      {
        _id: projectId,
      },
      { employees : req.body.employees} , 
      {new: true}
    );

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
}


exports.getProjectsWithTasks = async (req, res) =>{

  const projects = await Project.find({userId : req.params.userId , employees : req.params.employeeId}).populate({
    path: 'tasks',
    model: 'Task',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'times' ,  model: 'Time', }
})
  console.log(projects)
  
  res.status(200).json(projects );
}