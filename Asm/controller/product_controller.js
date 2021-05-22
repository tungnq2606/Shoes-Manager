var productServices = require("../services/product_services");
// get products
exports.getProductList = function () {
  return productServices.getProductList();
};
// add product
exports.addNewProduct = function (product) {
  productServices.addNewProduct(product);
};
// delete product
exports.deleteProduct = async function (id) {
  await productServices.deleteProduct(id);
};
// get product by id
exports.getProductByID = async function (id) {
  return await productServices.getProductByID(id);
};
// edit product
exports.editProduct = async function (id, params) {
  await productServices.editProduct(id, params);
};
// seacrh
exports.search = async function (keyword) {
  return await productServices.search(keyword);
};
exports.addOder = function (name) {
  productServices.addOder(name);
};
exports.getOder = async function () {
  return await productServices.getOder();
};
exports.deleteOder = async function (id) {
  await productServices.deleteOder(id);
};
