const express = require("express");
// Use built-in Express router
const router = express.Router();
const carController = require("../controllers/carsController");

// Create a new car
router.post("/create", carController.create);

// Read all cars
router.get("/readAll", carController.readAll);

// Read one car
router.get("/readOne/:id", carController.readOne);

// Update a car by ID
router.put("/update/:id", carController.update);

// Update multiple cars
router.put("/update/cars", carController.updateMultiple);

// Delete a car by ID
router.delete("/delete/:id", carController.delete);

module.exports = router;
