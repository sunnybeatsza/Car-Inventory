// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const getCars = require("./routes/getCars");

// Initialize express
const app = express();

app.use(cors());

// Set up port for server to listen on
const PORT = process.env.PORT || 8080;

const uri =
  "mongodb+srv://Test:Password123@cluster2.5uttvtn.mongodb.net/?retryWrites=true&w=majority";

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => {
    console.log("Successfully connected to the database!");
  },
  (err) => {
    console.log("Could not connect to the database..." + err);
  }
);

// Allow app to accept json and url encoded values
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routes to be handled from: http://localhost:8080/blogs

app.use("/cars", getCars);

// Start up express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
