// Importing necessary dependencies and modules from React and other libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import "../UpdateCars/UpdateCars.css";
import { Link } from "react-router-dom";

// Functional component for updating multiple cars
export const UpdateCars = () => {
  // Extracting car IDs from the URL parameters
  const { ids } = useParams();
  const carIdsArray = ids ? ids.split(",") : [];

  // State to store selected cars for updating
  const [selectedCars, setSelectedCars] = useState([]);

  // Formik hook for managing form state and submission logic
  const formik = useFormik({
    // Initial values for the form fields
    initialValues: {
      make: "",
      year: "",
      model: "",
      regNumber: "",
      engineSize: "",
      owner: "",
    },
    // Asynchronous form submission logic
    onSubmit: async (values) => {
      try {
        const updatedCars = [];

        // Looping through each car ID and sending update requests
        for (const carId of carIdsArray) {
          const response = await axios.put(
            `http://localhost:8080/cars/update/${carId}`,
            values
          );

          updatedCars.push(response.data);
        }

        // Alerting success message after updating cars
        alert("Cars updated successfully!");
      } catch (error) {
        // Handling errors during the update process
        console.error("Error updating cars:", error);
      }
    },
  });

  // Effect hook to fetch and set data for selected cars
  useEffect(() => {
    const fetchSelectedCars = async () => {
      try {
        // Creating an array of axios requests for each car ID
        const requests = carIdsArray.map((carId) =>
          axios.get(`http://localhost:8080/cars/readOne/${carId}`)
        );

        // Sending all requests concurrently and updating state with the responses
        const carsData = await axios.all(requests);
        setSelectedCars(carsData.map((response) => response.data));
      } catch (error) {
        // Handling errors during the data fetching process
        console.error("Error fetching selected cars data:", error);
      }
    };

    // Calling the fetchSelectedCars function when carIdsArray changes
    fetchSelectedCars();
  }, [carIdsArray]);

  // Rendering the UI elements, including the selected cars list and update form
  return (
    <div className="container">
      <h1>Edit Cars</h1>
      {/* Button to navigate back to the home page */}
      <button>
        <Link to="/">Home</Link>
      </button>

      {/* Displaying selected cars information in an unordered list */}
      <ul>
        {selectedCars.map((car) => (
          <li key={car._id}>
            <p>Make: {car.make}</p>
            <p>Year: {car.year}</p>
            <p>Model: {car.model}</p>
            <p>Registration Number: {car.regNumber}</p>
            <p>Engine Size: {car.engineSize}</p>
            <p>Owner: {car.owner}</p>
          </li>
        ))}
      </ul>

      {/* Form for updating car information */}
      <form onSubmit={formik.handleSubmit}>
        {/* Form input fields */}
        <input
          id="make"
          name="make"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.make}
        />
        <label htmlFor="make">Make</label>

        <input
          id="year"
          name="year"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.year}
        />
        <label htmlFor="year">Year</label>

        <input
          id="model"
          name="model"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.model}
        />
        <label htmlFor="model">Model</label>

        <input
          id="regNumber"
          name="regNumber"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.regNumber}
        />
        <label htmlFor="regNumber">Registration Number</label>

        <input
          id="engineSize"
          name="engineSize"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.engineSize}
        />
        <label htmlFor="engineSize">Engine Size</label>

        <input
          id="owner"
          name="owner"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.owner}
        />
        <label htmlFor="owner">Owner</label>

        {/* Submit button */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
