var express = require("express");
var router = express.Router();
var upload = require("../../common/upload");
var check = require("../../Common/Authen");
var categoryController = require("../../controller/category_controller");
var productController = require("../../controller/product_controller");

/* GET home page. */
var middleAddProduct = [check.check, upload.single("image")];
router.get("/", middleAddProduct, async function (req, res, next) {
  let list = await categoryController.getCategory();
  res.render("new-product", { list });
});
router.post("/", middleAddProduct, async function (req, res, next) {
  let imageUrl = req.file.originalname;
  req.body = { ...req.body, image: imageUrl };
  productController.addNewProduct(req.body);
  res.redirect("/products");
});

module.exports = router;
