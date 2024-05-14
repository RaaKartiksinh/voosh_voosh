const express = require("express");
const { editUser, getUserList, getUserProfile } = require("../controller/user");
const { isAuth } = require("../auth/IsAuth");


const userRouter = express.Router();

userRouter
  .get("/list", getUserList)
  .patch("/", isAuth(), editUser)
  .get("/profile", isAuth(), getUserProfile);

module.exports = userRouter;
