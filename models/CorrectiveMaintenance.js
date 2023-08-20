const mongoose = require('mongoose');
const Department =require("./department.js");
const Machine =require("./machine.js");
const Employee =require("./employee.js");
const CorrectiveMaintenanceSchema = new mongoose.Schema(
  {
   
   
        machineID: {
          type: mongoose.Schema.ObjectId,
          ref: Machine,
        },
        departmentID: {
          type: mongoose.Schema.ObjectId,
          ref: Department,
        },
        employeeID: {
          type: mongoose.Schema.ObjectId,
          ref: Employee,
        },
        dateStart: String,
        dateEnd: String,
        status:String,
        description:String,
        cost:Number,
        breakTime:Number,
        failureCause:String,
        dateCall:String,
        callOffBy:String,

   
   
  },
  { timestamps: true }
);

module.exports = mongoose.model('CorrectiveMaintenance', CorrectiveMaintenanceSchema);
