var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var check = require("../../Common/Authen");
var categoryController = require("../../controller/category_controller");

/* GET home page. */

router.get("/", check.check, async function (req, res, next) {
  let list = await categoryController.getCategory();
  res.render("category", { list });
});
router.delete("/delete/:id", async function (req, res, next) {
  let del = await categoryController.deleteCategory(req.params.id);
  console.log(del);
  res.send({ res: del });
});
router.get("/search/:value", async function (req, res, next) {
  console.log(req.params.value);
  let result = await categoryController.search(req.params.value);
  res.send({ result });
});

module.exports = router;
