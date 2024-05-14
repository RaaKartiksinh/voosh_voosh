const userModel = require("../model/userModel");
const crypto = require("crypto");

const createUser = async (req, res) => {
  try {
    const { role, email, firstName, lastName, password } = req.body;
    console.log("req.body  rrrrrrrrrrrrrrrrrrrrrrrrrr", req.body);
    // Check dependency
    if (!email || !firstName || !lastName || !password)
      return res.status(400).send({ message: "Missing dependency" });

    // Password hashed
    const salt = crypto.randomBytes(16);
    const hashedPassword = await new Promise((resolve, reject) => {
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        "sha256",
        (err, hashed) => {
          if (err) reject(err);
          resolve(hashed);
        }
      );
    });

    // Save User change password
    const result = await userModel.userModel.create({
      ...req.body,
      password: hashedPassword,
      salt,
    });
    if (result) return res.redirect("/");
    // return res
    //   .status(201)
    //   .send({ message: "User created successfully", user: result });

    return res.status(500).send({ message: "Something went wrong" });
  } catch (error) {
    // ValidationError
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send({ message: "Validation Error", errors });
    }

    // show errors
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      return res
        .status(400)
        .send({ message: "User already exists", errors: error.keyValue });
    }

    // error
    console.error("Internal Server Error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid credentials" });
    }

    const user = req.user;
    const token = req.user.token;
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: false,
    });
    // res.render("login");

    return res.status(201).json({ id: user.id, role: user.role, token: token });
  } catch (error) {
    console.error("Error setting cookie:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getLoginUser = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.error("Error setting cookie:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getSignup = async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.error("Error setting cookie:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    // If an error occurs, log it and send a generic error response
    console.error("Error during logout:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    if (req.user) {
      res.json({ status: "success", user: req.user });
    } else {
      res.status(401);
    }
  } catch (error) {
    console.error("Error during checkAuth:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  checkAuth,
  logout,
  getLoginUser,
  getSignup,
};
