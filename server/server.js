require("dotenv").config({ path: "./config.env" }); // TODO Remove options
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Docker hosting DB
// mongoose
//   .connect("mongodb://mongo-db/")
//   .then(() => console.log("Connected"))
//   .catch(() => console.log("Not connected"))

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

// Test User creation and DB connection
// const User = require('./models/User');
// const Score = require('./models/Score');
// Score.deleteMany().then(() => {
//     Success
//     console.log("Data deleted");
//   }).catch((error) => {
//     Failure
//     console.log(error);
//   });

// const handleNewUser = async (req, res) => {
//   //create and store the new user
//   const result = await User.create({
//     "username": "test_user6",
//     "name": "Thais",
//     "password": "password1"
//   });

//   console.log(result);

//   //create and store the new user
//   const result2 = await Score.create({
//     user: result.id, 
//     score: "9",
//   });

//   console.log(result2);
// };

// handleNewUser(null, null);
