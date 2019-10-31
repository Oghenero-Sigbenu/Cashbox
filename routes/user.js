const express = require("express");
const userController = require("../controllers/user");

const route = express.Router();

route.post("/attribute/create/:id", userController.createAttributes);
route.put("/update/:id", userController.createAttributes);
route.post("/add", userController.addUser);
route.get("/all", userController.getAllUsers);
route.delete("/delete/:id", userController.deleteAttribute);
route.get("/one/:id", userController.getUserById);
route.get("/:name", userController.getUserByName);

module.exports = route;