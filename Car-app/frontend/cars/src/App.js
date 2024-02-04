// Import necessary dependencies from React and other modules
import React from "react";
import "./App.css"; // Import the styles for the App component
import { Route, Routes } from "react-router-dom"; // Import Route and Routes components for routing
import { Home } from "./pages/Home"; // Import the Home component
import { CreateCar } from "./pages/CreateCar/CreateCar"; // Import the CreateCar component
import { DeleteCar } from "./pages/DeleteCar"; // Import the DeleteCar component
import { EditCar } from "./pages/EditCar"; // Import the EditCar component
import { UpdateCars } from "./pages/UpdateCars/UpdateCars";
import Sidebar from "./components/Sidebar";

// Define the main App component
function App() {
  // Render the App component
  return (
    // Use a div with the className "App" for styling
    <div className="App">
      {/* Set up routes using the Routes component */}
      <Sidebar />

      <Routes>
        {/* Define a route for the Home component, accessible at the root path */}
        <Route path="/" element={<Home />} />
        {/* Define a route for the CreateCar component, accessible at the "/cars/create" path */}
        <Route path="/cars/create" element={<CreateCar />} />
        {/* Define a route for the EditCars component, accessible at the "/cars/update/cars/:ids" path */}
        <Route path="/cars/update/cars/:ids" element={<UpdateCars />} />

        {/* Define a route for the EditCar component, accessible at the "/cars/update/:id" path */}
        <Route path="/cars/update/:id" element={<EditCar />} />
        {/* Define a route for the DeleteCar component, accessible at the "/cars/delete/:id" path */}
        <Route path="/cars/delete/:id" element={<DeleteCar />} />
      </Routes>
    </div>
  );
}

// Export the App component as the default export
export default App;
