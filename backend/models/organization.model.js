const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId,  
      ref: "User"
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
  }, 
  {timestamps: true}
);

const Organization = mongoose.model('Organization', organizationSchema)

module.exports = Organization;