const router = require('express').Router();
const Department = require('../models/department.model');
const Employee = require('../models/employee.model')
const User = require('../models/user.model')
const checkToken = require('../config/config');



/* 
  @route GET api/departments
  @desc get all departments
*/

router.get("/", async (req, res) => {
  try {
    let departments =  await Department.find().populate({path: 'organization', select: 'name'});
    res.status(200).json({
      message: 'Departments fetched',
      departments,
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Departments not found",
      statuscode: 'EB500'
    })
  }
})

/* 
  @route GET api/departments/organization/:id
  @desc get all departments in an organization
*/

router.get("/organization/:id", async (req, res) => {
  try {
    let departments =  await Department.find({organization: req.params.id})
    res.status(200).json({
      message: 'Departments fetched',
      departments,
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Department not found",
      statuscode: 'EB500'
    })
  }
})

/* 
  @route GET api/departments/:id
  @desc get department
*/

router.get("/:id", async (req, res) => {
  try {
    let department =  await Department.findById(req.params.id).populate({path: 'organization', select: 'name'});
    res.status(200).json({
      message: 'Department fetched',
      department,
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Department not found",
      statuscode: 'EB500'
    })
  }
})

/* 
  @route POST api/departments/new
  @desc add department to organization
*/


router.post("/new", checkToken, async (req, res) => {
  try {
    await Department.create({description: req.body.description, owner: req.body.owner, organization: req.body.organization, workingTime: req.body.workingTime, workingDays: req.body.workingDays})

    //increment user's organization count
    await User.findByIdAndUpdate(req.user.id,  { $inc : {deptNum: 1}})

    res.status(200).json({
      message: 'Department created',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Department could not be created",
      statuscode: 'EB500'
    })
  }
})


/* 
  @route PUT api/departments/:id
  @desc update department
*/

router.put("/:id", checkToken, async (req, res) => {
  try {
   await Department.findByIdAndUpdate(req.params.id, {description: req.body.description, owner: req.body.owner, workingTime: req.body.workingTime, workingDays: req.body.workingDays });

    res.status(200).json({
      message: 'Department updated',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Department could not be updated",
      statuscode: 'EB500'
    })
  }
})


/* 
  @route DELETE api/departments/:id
  @desc delete department
*/

router.delete("/:id", checkToken, async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);

    //count employees under dept to delete
    let employeeCount = await Employee.countDocuments({organization: req.params.id})

    //delete all employees under department
    await Employee.deleteMany({department: req.params.id})

    //decrement user's department count
    await User.findByIdAndUpdate(req.user.id, {$inc : {deptNum: -1, employeeNum: -employeeCount}})

    res.status(200).json({
      message: 'Department deleted',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Department could not be deleted",
      statuscode: 'EB500'
    })
  }
})

module.exports = router;