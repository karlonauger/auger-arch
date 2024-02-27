require("dotenv").config({ path: "./config.env" }); // TODO Remove options
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Cross Origin Resource Sharing
app.use(cors()); // TODO: Config options

// Built-in middleware or json
app.use(express.json());

// Routes
app.use(require("./routes/score"));
app.use(require('./routes/user'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
