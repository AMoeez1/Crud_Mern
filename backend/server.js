const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/moeezDb")
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log(err));

const User = require('./models/user');

app.use('/users', require('./routes/api'))

app.listen(5000, () => console.log('Server started on port 5000'));
