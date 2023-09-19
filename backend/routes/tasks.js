const express = require("express");
const router = express.Router();

const { create, getTasks , getTask  ,  UpdateStatus } = require("../controllers/task");
const { requireSignin } = require("../controllers/user");
const { taskSignupValidator } = require("../validator");



router.get("/:projectId",requireSignin, getTasks);
router.get("/:projectId/:taskId",requireSignin, getTask);


router.post("/:projectId",taskSignupValidator, requireSignin,create);

router.put("/status/:taskId", requireSignin,UpdateStatus);

module.exports = router;


  