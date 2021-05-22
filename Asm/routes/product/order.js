var express = require("express");
var router = express.Router();
var check = require("../../common/authen");
var productController = require("../../controller/product_controller");

/* GET users listing. */
router.post("/", function (req, res, next) {
  productController.addOder(req.body.name);
  res.status(200).json({ status: "Success" });
});
router.get("/", check.check, async function (req, res, next) {
  let list = await productController.getOder();
  res.render("order", { list });
});
router.delete("/delete/:id", check.check, async function (req, res, next) {
  await productController.deleteOder(req.params.id);
  res.send({ res: true });
});
module.exports = router;
