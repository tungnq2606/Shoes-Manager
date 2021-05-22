var express = require("express");
var router = express.Router();
var categoryController = require("../../controller/category_controller");

/* GET home page. */

router.get("/", async function (req, res, next) {
  res.render("register");
});
router.post("/", async function (req, res, next) {
  res.render("register");
});

module.exports = router;
