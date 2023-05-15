const express = require("express");
const app = express();
// req.body data using body-parser
const bodyParser = require("body-parser");

// cors is added for cross origin
const cors = require("cors");
// define server runnig port
const port = 4000;
// import mongodb database connection
require("./db/index.js");

// to save secure data
require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define routes which are coming from frontend
const UserRoute = require("./routes/user");
app.use("/", UserRoute);

// define routes which are coming from frontend
const FingerPrintRoute = require("./routes/fingerprint");
app.use("/", FingerPrintRoute);

// server is runnig on port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
