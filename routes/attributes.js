const express = require("express");
const attributesController = require("../controllers/attributes");

const route = express.Router();

route.post("/add", attributesController.addAttributes);
route.delete("/delete/:id", attributesController.deleteAttribute);
route.post("/update/:id", attributesController.updateAttributes);
route.get("/user/:id", attributesController.getUserAttribute);
route.get("/get/:id", attributesController.getAttributes);

module.exports = route;