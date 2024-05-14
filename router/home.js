const express = require("express");
const { isAuth } = require("../auth/IsAuth");

const homeRouter = express.Router();

homeRouter
  .get("/", (req, res) => {
    res.render("home");
    // res.status(200).send({ message: "app Start " });
  })
  .get("/protected", isAuth(), (req, res) => {
    console.log("dfdfdfdfdfdf", req);
    res.status(200).send({ message: "app protected " });
  });

module.exports = homeRouter;
