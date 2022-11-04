const ejs = require("ejs");

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
// To read JSON data in URL body
app.use(bodyParser.json());

// To read log URLs
app.use(bodyParser.urlencoded({ extended: true }));
//expres-session
const session = require("express-session");
const router = require("./Router/userRouter");
//confige reuire
const config = require("./Config/config");
//passport and passport-facebook
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

//ejs engine setup
app.set("view engine", "ejs");
//express-session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//facebook strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookAuth.clientId,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: config.facebookAuth.callbackUrl,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

//passport seriliaze and deserialize

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

//router
app.use("/", router);
async function run() {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port no:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to run:", error);
  }
}

run();
