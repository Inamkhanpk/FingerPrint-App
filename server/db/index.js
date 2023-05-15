const mongoose = require("mongoose");
require("dotenv").config();

// mongoose is used to connect mongodb with expressjs
const DB = process.env.MONGODB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected..");
  });
