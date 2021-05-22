var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var productController = require("../controller/product_controller");
var categoryController = require("../controller/category_controller");
var userController = require("../controller/user_controller");
var bcrypt = require("bcryptjs");
var check = require("../common/authen");
// products
router.get("/product", async function (req, res, next) {
  let list = await productController.getProductList();
  res.json(list);
});
// category
router.get("/category", async function (req, res, next) {
  let list = await categoryController.getCategory();
  res.json(list);
});
// register
router.post("/register", async function (req, res, next) {
  let { username, password } = req.body;
  let hashPassword = bcrypt.hashSync(password, 8);
  await userController.Register(username, hashPassword);
  res.status(200).json({ auth: true, msg: "Sucessful" });
});
router.post("/login", async function (req, res, next) {
  let { username, password } = req.body;
  const user = await userController.Login(username);
  if (!user) {
    res.status(401).json({ auth: false, msg: "Username not found" });
  } else {
    let passwordValid = bcrypt.compareSync(password, user.passWord);
    if (!passwordValid) {
      res.status(401).json({ auth: false, msg: "Password not valid" });
    } else {
      let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
      res.status(200).json({ token, auth: true });
    }
  }
});

router.get("/my-info", check.verifyToken, async function (req, res, next) {
  let user = await userController.getUserById(req.userId);
  res.status(200).json(user);
});

router.get("/search/:value", async function (req, res, next) {
  let list = await productController.search(req.params.value);
  res.status(200).json(list);
});
router.post("/cart", function (req, res, next) {
  userController.addToCart(req.body);
  res.status(200).json({ status: "Success" });
});
router.post("/get-cart", async function (req, res, next) {
  let list = await userController.getCart(req.body.name);
  res.status(200).json(list);
});

module.exports = router;
