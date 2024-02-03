// Import necessary dependencies from React and other modules
import React from "react";
import { useFormik } from "formik"; // Import useFormik hook for form management
import axios from "axios"; // Import axios for making HTTP requests
import "./CreateCar.css"; // Import styles for CreateCar component
import { Link } from "react-router-dom"; // Import Link for navigation

// Define the CreateCar component
export const CreateCar = () => {
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
        // Display form values for testing purposes
        alert(JSON.stringify(values, null, 2));
        // Make a POST request to create a new car with the provided values
        const response = await axios.post(
          "http://localhost:8080/cars/create",
          values
        );
        // Handle the response or perform additional actions
      } catch (error) {
        console.error("Error creating car:", error);
        // Handle errors, show an error message, etc.
      }
    },
  });

  // Render the CreateCar component
  return (
    <div>
      {/* Button to navigate back to the Home page */}
      <button>
        <Link to="/">Home</Link>
      </button>

      <h1>Create Car</h1>
      {/* Form for creating a new car */}
      <form onSubmit={formik.handleSubmit}>
        {/* Input fields for car details */}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
