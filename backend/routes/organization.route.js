const router = require('express').Router();
const Organization = require('../models/organization.model');
const Department = require('../models/department.model');
const Employee = require('../models/employee.model')
const User = require('../models/user.model')
const checkToken = require('../config/config');

/* 
  @route GET api/organizations
  @desc get all organizations
*/

router.get("/", async (req, res) => {
  try {
    let organizations =  await Organization.find().populate({path: 'owner', select: 'firstName lastName -_id'});
    res.status(200).json({
      message: 'Organizations fetched',
      organizations,
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Organizations not found",
      statuscode: 'EB500'
    })
  }
})

/* 
  @route GET api/organizations/:id
  @desc get organization
*/

router.get("/:id", async (req, res) => {
  try {
    let organization =  await Organization.findById(req.params.id).populate({path: 'owner', select: '-password'});
    res.status(200).json({
      message: 'Organization fetched',
      organization,
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Organization not found",
      statuscode: 'EB500'
    })
  }
})

/* 
  @route POST api/organizations
  @desc new organization
*/

router.post("/new", checkToken, async (req, res) => {
  try {
    
    await Organization.create({name: req.body.name, owner: req.user.id, address: req.body.address, city: req.body.city, state: req.body.state, country: req.body.country})

    //increment user's organization count
    await User.findByIdAndUpdate(req.user.id,  { $inc : {orgNum: 1}})

    res.status(200).json({
      message: 'Organization created',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Organization could not be created",
      statuscode: 'EB500'
    })
  }
})

/* 
  @route PUT api/organizations/:id
  @desc update organization
*/

router.put("/:id", checkToken, async (req, res) => {
  try {
    let organization =  await Organization.findByIdAndUpdate(req.params.id, {name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, country: req.body.country});

    res.status(200).json({
      message: 'Organization updated',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Organization could not be updated",
      statuscode: 'EB500'
    })
  }
})


/* 
  @route DELETE api/organizations/:id
  @desc delete organization
*/

router.delete("/:id", checkToken, async (req, res) => {
  try {
    await Organization.findByIdAndDelete(req.params.id);

    //count employees & depts under organization to delete
    let employeeCount = await Employee.countDocuments({organization: req.params.id})
    let deptCount = await Department.countDocuments({organization: req.params.id})
    

    //delete all departments and employees under organization
    await Department.deleteMany({organization: req.params.id})
    await Employee.deleteMany({organization: req.params.id})

    //decrement user's organization count
    await User.findByIdAndUpdate(req.user.id,  {$inc : {orgNum: -1, deptNum: -deptCount, employeeNum: -employeeCount}})

    res.status(200).json({
      message: 'Organization deleted',
    })

  } catch (err) {
    res.status(500).json({
      message: "Error: Organization could not be deleted",
      statuscode: 'EB500'
    })
  }
})


module.exports = router;