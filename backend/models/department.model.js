const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId,  
      ref: "User"
    },
    organization: { 
      type: mongoose.Schema.Types.ObjectId,  
      ref: "Organization"
    },
    workingTime: {
      type: String,
      required: true
    },
    workingDays: {
      type: String,
      required: true
    },
  }, 
  {timestamps: true}
);

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department;