var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var check = require("../../Common/Authen");
var categoryController = require("../../controller/category_controller");

/* GET home page. */

router.get("/:id", check.check, async function (req, res, next) {
  let category = await categoryController.getCategoryByID(req.params.id);
  res.render("edit-category", { category });
});
router.post("/:id", check.check, async function (req, res, next) {
  console.log(req.body);
  await categoryController.editCategory(req.params.id, req.body);
  res.redirect("/category");
});
module.exports = router;
