const express = require("express");
const router = express.Router();

const { create, getProjects  ,setEmployeesInProject ,  getProjectsWithTasks} = require("../controllers/project");
const { requireSignin } = require("../controllers/user");
const { projectSignupValidator } = require("../validator");



router.get("/:userId",requireSignin, getProjects);
router.get("/:userId/:employeeId",requireSignin, getProjectsWithTasks);



router.post("/:userId",projectSignupValidator, requireSignin,create);
router.put("/employees/:projectId", requireSignin,setEmployeesInProject);
module.exports = router;


  