// Import necessary dependencies from React and other modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Define the DeleteCar component
export const DeleteCar = () => {
  // Extract the 'id' parameter from the route using useParams
  const { id } = useParams();
  // Access the navigate function from react-router-dom for page redirection
  const navigate = useNavigate();
  // Set up state to store car data
  const [car, setCar] = useState(null);

  // Use the useEffect hook to fetch the car data by ID when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch car data by ID
    const fetchCarById = async () => {
      try {
        // Make a GET request to retrieve the car data based on the provided ID
        const response = await axios.get(
          `http://localhost:8080/cars/readOne/${id}`
        );
        setCar(response.data); // Update the state with fetched car data
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    // Call the fetchCarById function when the component mounts or when 'id' changes
    fetchCarById();
  }, [id]);

  // Define a function to handle the delete operation
  const handleDelete = async () => {
    try {
      // Make a DELETE request to delete the car based on the provided ID
      await axios.delete(`http://localhost:8080/cars/delete/${id}`);
      // Display a success message
      alert("Car deleted successfully!");
      // Redirect to the home page or any other desired page
      navigate("/");
    } catch (error) {
      console.error("Error deleting car:", error);
      // Handle errors, show an error message, etc.
    }
  };

  // Render the DeleteCar component
  return (
    <div>
      {car ? ( // Conditional rendering based on whether car data is available
        <div>
          <h2>Delete Car</h2>
          <p>Are you sure you want to delete the following car?</p>
          {/* Display car details */}
          <p>
            Make: {car.make}, Year: {car.year}, Model: {car.model}, Registration
            Number: {car.regNumber}, Engine Size: {car.engineSize}, Owner:{" "}
            {car.owner}
          </p>
          {/* Button to initiate the delete operation */}
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        // Display a loading message while car data is being fetched
        <p>Loading...</p>
      )}
    </div>
  );
};
