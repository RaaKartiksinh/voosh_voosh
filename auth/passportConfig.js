const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const { userInfo } = require("os");
require("dotenv").config();

// ENV file
const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET_KEY", SECRET_KEY);

// userInfo
const sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

// get Cookies for requst
const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

// Jwt Secret
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (username, password, done) {
      try {
        const user = await userModel.userModel.findOne({ email: username });
        if (user) {
          crypto.pbkdf2(
            password,
            user.salt,
            310000,
            32,
            "sha256",
            async function (err, hashedPassword) {
              if (err) {
                return done(err);
              }
              const userPasswordBuffer = Buffer.from(user.password);

              if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
                return done(null, false, { message: "Invalid credentials" });
              }
              console.log(user);
              const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
              return done(null, { id: user.id, role: user.role, token });
            }
          );
        } else {
          // User not found, return appropriate error message
          return done(null, false, { message: "User does not exist" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("jwt_payload", { jwt_payload });
    console.log("jwt_payload done", done);
    try {
      const user = await userModel.userModel.findOne({ _id: jwt_payload.id });
      console.log(user, "Jwt_>");
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serializeUser        ", user);
  console.log("serializeUser    user", user);
  process.nextTick(function () {
    return cb(null, { id: user._id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize        ", user);
  console.log("de-serialize   user ", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

// GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

module.exports = passport;
