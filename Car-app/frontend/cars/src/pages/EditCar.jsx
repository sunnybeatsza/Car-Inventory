// Import necessary dependencies from React and other modules
import React, { useEffect } from "react";
import { useFormik } from "formik"; // Import useFormik hook for form management
import axios from "axios"; // Import axios for making HTTP requests
import "./CreateCar/CreateCar.css"; // Import styles for CreateCar component
import { useParams } from "react-router-dom"; // Import useParams for accessing route parameters
import { Link } from "react-router-dom";

// Define the EditCar component
export const EditCar = () => {
  // Extract the 'id' parameter from the route using useParams
  const { id } = useParams();

  // Use the useFormik hook to manage the form state and submission
  const formik = useFormik({
    initialValues: {
      make: "", // New field for make
      year: "",
      model: "",
      regNumber: "", // New field for regNumber
      engineSize: "",
      owner: "", // New field for owner
    },
    onSubmit: async (values) => {
      try {
        // Make a PUT request to update the car data with the provided values
        const response = await axios.put(
          `http://localhost:8080/cars/update/${id}`,
          values
        );
        // Handle the response or perform additional actions
        alert("Car updated successfully!");
      } catch (error) {
        console.error("Error updating car:", error);
        // Handle errors, show an error message, etc.
      }
    },
  });

  // Use the useEffect hook to fetch the existing car data when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch car data by ID
    const fetchCarById = async () => {
      try {
        // Make a GET request to retrieve the car data based on the provided ID
        const response = await axios.get(
          `http://localhost:8080/cars/read/${id}`
        );
        const carData = response.data;

        // Set the form values based on the fetched car data
        formik.setValues({
          make: carData.make,
          year: carData.year,
          model: carData.model,
          regNumber: carData.regNumber,
          engineSize: carData.engineSize,
          owner: carData.owner,
        });
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    // Call the fetchCarById function when the component mounts or when 'id' changes
    fetchCarById();
  }, [id, formik]);

  // Render the form for updating car data
  return (
    <div>
      <button>
        <Link to="/">Home</Link>
      </button>

      <h1>Edit Car</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* Form input fields */}
        <label htmlFor="make">Make</label>
        <input
          id="make"
          name="make"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.make}
        />

        <label htmlFor="year">Year</label>
        <input
          id="year"
          name="year"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.year}
        />

        <label htmlFor="model">Model</label>
        <input
          id="model"
          name="model"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.model}
        />

        <label htmlFor="regNumber">Registration Number</label>
        <input
          id="regNumber"
          name="regNumber"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.regNumber}
        />

        <label htmlFor="engineSize">Engine Size</label>
        <input
          id="engineSize"
          name="engineSize"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.engineSize}
        />

        <label htmlFor="owner">Owner</label>
        <input
          id="owner"
          name="owner"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.owner}
        />

        {/* Submit button */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
