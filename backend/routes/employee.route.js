const router = require('express').Router();
const Employee = require('../models/employee.model')
const User = require('../models/user.model')
const checkToken = require('../config/config');



/* 
  @route GET api/employees
  @desc get all employees
*/

router.get("/", async (req, res) => {
  try {
    let employees =  await Employee.find().populate({path: 'organization', select: 'name'}).populate({path: 'department', select: 'description'});
    res.status(200).json({
      message: 'Employees fetched',
      employees,
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Employees not found",
      statuscode: 'EB500'
    })
  }
})

/* 
  @route GET api/employees/:id
  @desc get employees
*/

router.get("/:id", async (req, res) => {
  try {
    let employee =  await Employee.findById(req.params.id).populate({path: 'organization', select: 'name'}).populate({path: 'department', select: 'description'});
    res.status(200).json({
      message: 'Employee fetched',
      employee,
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Employee not found",
      statuscode: 'EB500'
    })
  }
})

/* 
  @route POST api/employees/new
  @desc add employee to department
*/


router.post("/new", checkToken, async (req, res) => {
  try {
    await Employee.create({firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob, organization: req.body.organization, department: req.body.department, workTitle: req.body.workTitle, totalExperience: req.body.totalExperience })

    //increment user's employee count
    await User.findByIdAndUpdate(req.user.id,  { $inc : {employeeNum: 1}})

    res.status(200).json({
      message: 'Employee created',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Employee could not be created",
      statuscode: 'EB500'
    })
  }
})


/* 
  @route PUT api/employees/:id
  @desc update employee
*/

router.put("/:id", checkToken, async (req, res) => {
  try {
   await Employee.findByIdAndUpdate(req.params.id, {firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob, department: req.body.department, workTitle: req.body.workTitle, totalExperience: req.body.totalExperience });

    res.status(200).json({
      message: 'Employee updated',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Employee could not be updated",
      statuscode: 'EB500'
    })
  }
})


/* 
  @route DELETE api/employees/:id
  @desc delete employee
*/

router.delete("/:id", checkToken, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    //decrement user's department count
    await User.findByIdAndUpdate(req.user.id,  { $inc : {employeeNum: -1}})

    res.status(200).json({
      message: 'Employee deleted',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Employee could not be deleted",
      statuscode: 'EB500'
    })
  }
})

module.exports = router;