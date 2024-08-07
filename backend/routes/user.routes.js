const express = require("express");
const route = express.Router();
const { signdata,loginData, logOut, } = require("../controller/auth.controller");

route.post("/signup", signdata);
route.post("/login",loginData);
route.post("/logout",logOut);


module.exports = route;