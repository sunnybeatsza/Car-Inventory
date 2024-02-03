const Car = require("../models/carModel");

// CRUD Operations

// Create
exports.create = async (req, res) => {
  try {
    const { year, model, engineSize, make, owner, regNumber } = req.body;

    // Create a new Car instance based on the model
    const newCar = new Car({
      year,
      model,
      engineSize,
      make,
      regNumber,
      owner,
    });

    // Save the new car to the database
    const savedCar = await newCar.save();
    console.log(savedCar);
    res.status(201).json(savedCar); // Respond with the saved car object
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Read all cars
exports.readAll = async (req, res) => {
  try {
    // Use the find method to retrieve all cars from the database
    const allCars = await Car.find();

    res.status(200).json(allCars); // Respond with the array of car objects
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Find a car by ID

exports.readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCar = await Car.findById(id);

    if (!foundCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(foundCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Update a car by ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params; // Extract the car ID from the request parameters
    const { year, model, engineSize, make, regNumber, owner } = req.body;

    // Use findByIdAndUpdate to update the car by ID
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { year, model, engineSize, make, regNumber, owner },
      { new: true } // Return the updated document
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(updatedCar); // Respond with the updated car object
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Update multiple cars by ID
exports.updateMultiple = async (req, res) => {
  try {
    const cars = req.body; // Assume cars is an array of car objects with id and details

    const updatedCars = await Promise.all(
      cars.map(async (car) => {
        const { id, year, model, engineSize, make, regNumber, owner } = car;

        // Use findByIdAndUpdate to update the car by ID
        const updatedCar = await Car.findByIdAndUpdate(
          id,
          { year, model, engineSize, make, regNumber, owner },
          { new: true } // Return the updated document
        );

        if (!updatedCar) {
          return { id, error: "Car not found" };
        }

        return updatedCar;
      })
    );

    res.status(200).json(updatedCars); // Respond with the array of updated car objects
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Delete a car by ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params; // Extract the car ID from the request parameters

    // Use findByIdAndDelete to delete the car by ID
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
