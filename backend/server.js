const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/employeeDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Import Employee Model
const Employee = require("./models/Employee");

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

// Add Employee
app.post("/employee", async (req, res) => {
  try {

    console.log(req.body);

    const emp = new Employee({
      name: req.body.name,
      department: req.body.department,
      attendance: 0
    });

    await emp.save();

    console.log("Employee Saved");

    res.json(emp);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);
  }
});

// Get All Employees
app.get("/employees", async (req, res) => {
  try {

    const data = await Employee.find();

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);
  }
});

// Delete Employee
app.delete("/employee/:id", async (req, res) => {
  try {

    await Employee.findByIdAndDelete(req.params.id);

    res.json({ message: "Employee Deleted" });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);
  }
});

// Mark Attendance
app.put("/employee/:id/attendance", async (req, res) => {
  try {

    const emp = await Employee.findById(req.params.id);

    emp.attendance += 1;

    await emp.save();

    res.json(emp);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});