// Import the Mongoose library
const mongoose = require("mongoose");

// Define the carSchema using the mongoose.Schema constructor
const carSchema = mongoose.Schema({
  // Make of the car (brand)
  make: {
    type: String,
    required: false, // Field is optional
  },

  // Manufacturing year of the car
  year: {
    type: Number,
    required: true, // Field is required
  },

  // Model of the car
  model: {
    type: String,
    required: false, // Field is optional
  },

  // Registration number of the car
  regNumber: {
    type: String,
    required: false, // Field is optional
  },

  // Engine size of the car
  engineSize: {
    type: Number,
    required: false, // Field is optional
  },

  // Owner of the car
  owner: {
    type: String,
    required: false, // Field is optional
  },
});

// Export the model based on the carSchema
module.exports = mongoose.model("Car", carSchema);
