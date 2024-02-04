// Import necessary dependencies from React, axios, and react-router-dom
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

// Define the Home component
export const Home = () => {
  // Set up state variables using the useState hook
  const [cars, setCars] = useState([]); // State for storing car data
  const [query, setQuery] = useState(""); // State for storing search query
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [selectedCars, setSelectedCars] = useState([]);
  const [filterOlderThan5Years, setFilterOlderThan5Years] = useState(false);

  const handleCheckboxChange = (carId) => {
    setSelectedCars((prevSelectedCars) => {
      if (prevSelectedCars.includes(carId)) {
        // If the carId is already in the array, remove it
        return prevSelectedCars.filter((id) => id !== carId);
      } else {
        // If the carId is not in the array, add it
        return [...prevSelectedCars, carId];
      }
    });
  };

  const filterCarsOlderThan5Years = () => {
    const filteredCars = cars.filter(
      (car) => new Date().getFullYear() - car.year >= 5
    );
    setFilterOlderThan5Years(true); // Optionally set a state to remember the filter
    setCars(filteredCars);
  };

  // Use the useEffect hook to fetch car data from the server when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data
        // Make a GET request to the server to retrieve car data
        const response = await axios.get("http://localhost:8080/cars/readAll");
        setCars(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading back to false after fetching data
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  // Filter cars based on the query entered in the search input
  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(query) ||
      car.year.toString().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.regNumber.toLowerCase().includes(query) ||
      car.engineSize.toString().includes(query) ||
      car.owner.toLowerCase().includes(query)
  );

  // Render the Home component
  return (
    <div className="home-container">
      <div>
        {/* Header section */}
        <button>
          <Link to="/">Home</Link>
        </button>

        <div>
          <h1>Cars Inventory</h1>

          <div className="header">
            {/* Link to the CreateCar page */}
            <Link to="/cars/create">Create car</Link>
            <Link to={`/cars/update/cars/${selectedCars.join(",")}`}>
              Edit Cars
            </Link>
            <button onClick={() => filterCarsOlderThan5Years()}>
              5 years+
            </button>
          </div>
        </div>

        {/* Search input */}
        <input
          className="my-3"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        {console.log(selectedCars)}

        {/* Display car data in a table */}
        <div>
          {loading ? ( // Display loading message if data is still being fetched
            <h2>Loading... please wait</h2>
          ) : (
            <table>
              <thead>
                {/* Table header row */}
                <tr>
                  <th>Select</th>
                  <th>Make</th>
                  <th>Year</th>
                  <th>Model</th>
                  <th>Registration Number</th>
                  <th>Engine Size</th>
                  <th>Owner</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through filtered cars and display them in the table */}
                {filteredCars.map((car) => (
                  <tr key={car._id}>
                    <td>
                      <input
                        type="checkbox"
                        value={car._id}
                        name={car._id}
                        checked={selectedCars.includes(car._id)}
                        onChange={() => handleCheckboxChange(car._id)}
                      />
                    </td>

                    <td>{car.make}</td>
                    <td>{car.year}</td>
                    <td>{car.model}</td>
                    <td>{car.regNumber}</td>
                    <td>{car.engineSize}</td>
                    <td>{car.owner}</td>
                    <td>
                      {/* Links to the EditCar and DeleteCar pages with car ID */}
                      <Link to={`cars/update/${car._id}`}>Edit</Link>
                      <Link to={`/cars/delete/${car._id}`}>Delete</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
