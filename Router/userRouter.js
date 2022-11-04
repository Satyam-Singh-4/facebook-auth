const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("/home/satyamsingh/Desktop/authentication/Views/home.ejs");
});

//Authentication error

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

//Auth callback
router.get("auth/facebook/callback", function () {
  passport.authenticate("facebook", {
    successRedirect: "/login",
    failureRedirect: "/error",
  });
});

//login
router.get("/login", isLoggedIn, function (req, res) {
  res.render("login.ejs", {
    user: req.user,
  });
});

//error router

router.get("/error", isLoggedIn, function (req, res) {
  res.render("error.ejs");
});

//logout

router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});

//middleware functions

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
