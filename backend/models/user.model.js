const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orgNum: {
      type: Number,
      default: 0,
    },
    deptNum: {
      type: Number,
      default: 0,
    },
    employeeNum: {
      type: Number,
      default: 0,
    },
  }, 
  {timestamps: true}
);

const User = mongoose.model('User', userSchema)

module.exports = User;