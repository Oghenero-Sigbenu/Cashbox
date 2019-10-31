const express = require("express");
const userController = require("../controllers/user");

const route = express.Router();

route.post("/attribute/create/:id", userController.createAttributes);
route.put("/update/:id", userController.createAttributes);
route.post("/add", userController.addUser);
route.get("/all", userController.getAllUsers);
route.get("/:name", userController.getUserByName);
route.delete("/delete/:id", userController.deleteAttribute);
route.get("/:id", userController.getUserById);

module.exports = route;