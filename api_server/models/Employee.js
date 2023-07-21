import mongoose from "mongoose";

// Define the employee schema
const employeeSchema = new mongoose.Schema({
  // First name of the employee
  firstName: { type: String, required: true },

  // Last name of the employee
  lastName: { type: String, required: true },

  // Age of the employee
  age: { type: Number, required: true },

  // Date of joining for the employee
  dateOfJoining: { type: Date, required: true },

  // Title of the employee (Employee, Manager, Director, VP)
  title: {
    type: String,
    enum: ["Employee", "Manager", "Director", "VP"],
    required: true,
  },

  // Department of the employee (IT, Marketing, HR, Engineering)
  department: {
    type: String,
    enum: ["IT", "Marketing", "HR", "Engineering"],
    required: true,
  },

  // Type of employment for the employee (FullTime, PartTime, Contract, Seasonal)
  employeeType: {
    type: String,
    enum: ["FullTime", "PartTime", "Contract", "Seasonal"],
    required: true,
  },

  // Current status of the employee (true = active, false = inactive)
  currentStatus: { type: Boolean, default: true },
});

// Create the Employee model using the employee schema
const EmployeeModel = mongoose.model("Employee", employeeSchema);

// Export the Employee model
export { EmployeeModel };
