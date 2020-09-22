const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkToken = require('../config/config');
const Organization = require('../models/organization.model');
const Employee = require('../models/employee.model');
const Department = require('../models/department.model');
require('dotenv').config()


/* 
  @route POST api/auth/register
  @desc register user
*/

router.post('/register', async (req, res) => {

  let {firstName, lastName, email, password } = req.body;
  try {
    let user = new User({firstName, lastName, email });
    //bcrypt takes in password and salt
    let hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();

    const payload = {
      user: {
        id: user._id,
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 36000000}, (err, token) => {
      if (err) throw err; //if error go to catch
      res.status(200).json({ message: 'User registered successfully!', token, user: payload });
    })
 
  } catch (error) {
    console.log(error.errors)
    res.status(500).json({message: 'Could not register new user'});
  }
})

/* 
  @route POST api/auth/login
  @desc login user
*/

router.post('/signin', async (req, res) => {
  let {email, password } = req.body;
  try {

    //search db for user w matching email
    let user = await User.findOne({email});

    if(!user){
      return res.status(400).json({credentials: 'user not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({credentials: 'incorrect login details'});
    }

    const payload = {
      user: {
        id: user._id
      }
    };

    //token on login

    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 36000000}, (err, token) => {
      if (err) throw err; 
      res.status(200).json({ token });
    })

  } catch (error) {
    res.status(500).json({ message: 'token missing' });
  }
})

/* 
  @route POST api/auth/email
  @desc check for unique email
*/

router.post('/email', async (req, res) => {
  try {
    let user = await User.findOne({email: req.body.email})

    if(!user){
      res.status(200).json({
        available: true
      })
    } else if(user){
      res.status(422).json({
        email: 'Account with email already exists',
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Error',
    })
  }
})

/* 
  @route GET api/auth/user
  @desc get user info
*/

router.get('/user', checkToken, async (req, res) => {
  try {
    let user = await User.findById(req.user.id, "-password")
    res.status(200).json({
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Cannnot Get User Info',
    })
  }
})

router.get('/stats', async (req, res) => {
  try {
    let orgNum = await Organization.countDocuments({});
    let deptNum = await Department.countDocuments({});
    let employeeNum = await Employee.countDocuments({});
    let stats = { orgNum, deptNum, employeeNum }
    res.status(200).json({
      stats,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Cannnot Get Stats',
    })
  }
})
module.exports = router;