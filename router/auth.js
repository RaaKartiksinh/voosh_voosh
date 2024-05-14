const express = require("express");
const {
  createUser,
  logout,
  loginUser,
  checkAuth,
  getLoginUser,
  getSignup,
} = require("../controller/auth");
const passport = require("passport");

const authRouter = express.Router();

authRouter
  .post("/signup", createUser)
  .get("/logout", logout)
  .get("/login", getLoginUser)
  .get("/signup", getSignup)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    loginUser
  )
  .get(
    "/google",
    passport.authenticate("google", { scope: ["email ,profile"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      console.log(res);
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

module.exports = authRouter;
