const e = require("express");
const express = require("express");
const {
  register,
  login,
  get_profile,
  update_profile,
  delete_profile,
  reset_password,
  verify_reset_password,
} = require("../../Controllers/UserControllers/UserControllers");
const isLoggedIn = require("../../Middleware/IsLoggedIn");

const user_route = express.Router();

user_route.post("/register", register);
user_route.post("/login", login);
user_route.post("/reset-password", reset_password);
user_route.post("/verify-reset-password", verify_reset_password);
user_route.get("/", isLoggedIn, get_profile);
user_route.put("/", isLoggedIn, update_profile);
user_route.delete("/", isLoggedIn, delete_profile);

module.exports = user_route;
