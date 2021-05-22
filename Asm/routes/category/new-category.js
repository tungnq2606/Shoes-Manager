var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var check = require("../../Common/Authen");
var categoryController = require("../../controller/category_controller");

/* GET home page. */

router.get("/", check.check, async function (req, res, next) {
  res.render("new-category");
});
router.post("/", check.check, async function (req, res, next) {
  categoryController.addNewCategory(req.body);
  res.redirect("/category");
});

module.exports = router;
