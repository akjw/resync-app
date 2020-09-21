//==== require all dependencies 
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require("path")



//==== middleware
// app.use(express.static(path.join(__dirname, "client", "build")))
require('./config/db'); 
app.use(express.json()); 
app.use(cors()); 



//=== setup routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/organizations', require('./routes/organization.route'));
// app.use('/api/employees', require('./routes/employee.route'));
// app.use('/api/departments', require('./routes/department.route'));


//==== 404 errors
app.get('*', (req, res) => {
  res.status(404).json({ message: "404: Not Found" , code: 'EB404'})
})


//=== setup server part
app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`));