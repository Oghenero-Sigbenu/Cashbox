require("dotenv").config(); // allows our project read variables from .env files
const path = require("path");
const express = require("express");
// Enables Cross Origin Resource Sharing for our Project

const cors = require("cors");
const sequelize = require("./config/database");

app = express();
app.use(cors());
app.options('*', cors());

// This parses all json request so we can access
// its contents via 'req.body' object
app.use(express.json());

//routes
const userRoute = require("./routes/user");
const attributeRoute = require("./routes/attributes");

app.use("/user", userRoute);
app.use("/attributes", attributeRoute);

const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then((result) => {
        // this creates a http server and listens for incoming requests
        app.listen(PORT, () => console.log("Started on " + PORT));
    })
    .catch((err) => console.log(err));