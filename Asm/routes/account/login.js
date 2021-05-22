var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var check = require("../../Common/Authen");

/* GET home page. */
var user = [{ id: 1, us: "1", pw: "1" }];

router.get("/", check.check, function (req, res, next) {
  res.redirect("/products");
});
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.post("/login", function (req, res, next) {
  let { us, pw } = req.body;
  let userLogin = user.find((val) => val.us == us && val.pw == pw);
  if (userLogin) {
    let token = jwt.sign({ userLogin }, process.env.JWT_KEY);
    req.session.token = token;
    res.redirect("/products");
  } else {
    res.redirect("/");
  }
  router.get("/logout", function (req, res, next) {
    req.session.destroy(() => res.redirect("/login"));
  });
});
module.exports = router;
