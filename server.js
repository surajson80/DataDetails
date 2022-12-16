const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require('axios');
const db = require("./database/models");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

//to create the table first time into database
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My application." });
});

require("./database/routes/route")(app);
app.get("/api", (req, res) => {
  res.json();
});

axios.get('http://localhost:4005/gateway/web').then(resp => {    
});

app.listen(4005, () => {
  console.log("server running on port 4005");
});
