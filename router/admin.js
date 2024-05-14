const express = require("express");
const { getAdminList } = require("../controller/admin");

const adminRouter = express.Router();

adminRouter.get("/list", getAdminList);

module.exports = adminRouter;
