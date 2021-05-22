var express = require("express");
var router = express.Router();
var upload = require("../../common/upload");
var check = require("../../Common/Authen");
var categoryController = require("../../controller/category_controller");
var productController = require("../../controller/product_controller");

/* GET home page. */
var middleAddProduct = [check.check, upload.single("image")];
router.get("/:id", middleAddProduct, async function (req, res, next) {
  let list = await productController.getProductByID(req.params.id);
  let category = await categoryController.getCategory();
  res.render("edit-product", { list, category });
});
router.post("/:id", middleAddProduct, async function (req, res, next) {
  let { params, body } = req;
  if (req.file) {
    let imageUrl = req.file.originalname;
    body = { ...body, image: imageUrl };
    console.log(body);
  } else {
    let list = await productController.getProductByID(req.params.id);
    let imageUrl = list.image;
    body = { ...body, image: imageUrl };
    console.log(body);
  }
  await productController.editProduct(params, body);
  res.redirect("/products");
});

module.exports = router;
