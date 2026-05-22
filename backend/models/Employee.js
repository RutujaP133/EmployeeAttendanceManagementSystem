const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  attendance: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);