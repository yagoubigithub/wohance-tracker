const express = require("express");
const { create, getEmployees , signin  ,getEmployee} = require("../controllers/employee");
const { requireSignin } = require("../controllers/user");
const { employeeSignupValidator } = require("../validator");
const router = express.Router();


router.get("/:userId",requireSignin, getEmployees);
router.get("/employee/:employeeId",requireSignin, getEmployee);




router.post("/:userId",employeeSignupValidator, requireSignin,create);

router.post("/employee/signin", signin);
module.exports = router;