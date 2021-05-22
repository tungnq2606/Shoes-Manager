var categoryModel = require("../model/category_model");
var productModel = require("../model/product_model");
var cartModel = require("../model/cart_model");
var oderModel = require("../model/oder_model");
var moment = require("moment");

// get products
exports.getProductList = async function () {
  let productList = await productModel.find().populate("category");
  return productList;
};
// add new product
exports.addNewProduct = function (product) {
  console.log(product);
  const model = new productModel(product);
  model.save();
};
// delete product
exports.deleteProduct = async function (id) {
  await productModel.remove({ _id: id });
};
// get product by id
exports.getProductByID = async function (id) {
  let product = await productModel.findById(id).populate("category");
  return product;
};
// edit product
exports.editProduct = async function (id, params) {
  let ID = id.id;
  let product = await productModel.findById(ID);
  if (product) {
    product.productName = params.productName;
    product.category = params.category;
    product.price = params.price;
    product.size = params.size;
    product.image = params.image;
    await product.save();
  }
};
// search
exports.search = async function (keyword) {
  let temp = await productModel.find().populate("category");
  if (keyword == "false") {
    return temp;
  }
  return await temp.filter((s) =>
    s.productName.toLowerCase().includes(keyword.toLowerCase())
  );
};
//
exports.addOder = async function (name) {
  let list = await cartModel.find({ customer: name });
  await cartModel.find({ customer: name }).remove();
  list.forEach((s) => {
    let newList = {
      image: s.image,
      productName: s.productName,
      price: s.total,
      size: s.size,
      date: Date.now(),
      customerName: s.customer,
    };
    const model = new oderModel(newList);
    model.save();
  });
};
//
exports.getOder = async function () {
  let list = await oderModel.find();
  list = list.map((s) => {
    return {
      id: s._id,
      image: s.image,
      productName: s.productName,
      price: s.price,
      size: s.size,
      date: moment(s.date).format("LLL"),
      customerName: s.customerName,
    };
  });
  return list;
};
//
exports.deleteOder = async function (id) {
  await oderModel.remove({ _id: id });
};
