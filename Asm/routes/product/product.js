var express = require("express");
var router = express.Router();
var check = require("../../common/authen");
var productController = require("../../controller/product_controller");

router.get("/", check.check, async function (req, res, next) {
  let list = await productController.getProductList();
  res.render("product", { list });
});

router.delete("/delete/:id", check.check, function (req, res, next) {
  productController.deleteProduct(req.params.id);
  res.send({ res: true });
});
router.get("/search/:value", async function (req, res, next) {
  console.log(req.params.value);
  let result = await productController.search(req.params.value);
  res.send({ result });
});
module.exports = router;
