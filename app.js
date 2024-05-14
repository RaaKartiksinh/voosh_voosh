require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const passport = require("./auth/passportConfig");
const connectToDB = require("./dBConnect");
const path = require("path");

const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const homeRouter = require("./router/home");
const authRouter = require("./router/auth");

const app = express();
// Mongoose DataBase Connected
connectToDB();
// Middlwar
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(fileUpload());
app.use("/Uploads", express.static("./Uploads"));

// set the view engine to ejs
app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));
app.set("views", path.join(__dirname, "views"));

// Router

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`\n app Start on port ${port} ___🚀___ http://localhost:8080/`);
});
