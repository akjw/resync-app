const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName:  {
      type: String,
      required: true
    },
    dob:  {
      type: Date,
      required: true
    },
    organization: { 
      type: mongoose.Schema.Types.ObjectId,  
      ref: "Organization"
    },
    department: { 
      type: mongoose.Schema.Types.ObjectId,  
      ref: "Department"
    },
    workTitle: {
      type: String,
      required: true
    },
    totalExperience: {
      type: Number,
      required: true
    },
  }, 
  {timestamps: true}
);

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee;