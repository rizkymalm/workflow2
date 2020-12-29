const express = require("express");
const UserController = require("../controllers/user");
const Router = express.Router();

Router.get("/", UserController.getUserIndex);
Router.get("/edit/:id_employee", UserController.getUserEdit);
Router.post("/update", UserController.getUserUpdate);
Router.get("/team", UserController.getTeam);
Router.get("/team/create", UserController.getCreateTeam);
Router.post("/team/save", UserController.getSaveTean);
module.exports = Router;
