var categoryServices = require("../services/category_services");

exports.getCategory = async function () {
  return await categoryServices.getCategory();
};
exports.addNewCategory = function (params) {
  let newCategory = { categoryName: params.categoryName };
  categoryServices.addNewCategory(newCategory);
};
exports.getCategoryByID = async function (id) {
  return await categoryServices.getCategoryByID(id);
};
exports.editCategory = async function (id, body) {
  let newCategory = { categoryName: body.categoryName };
  categoryServices.editCategory(id, newCategory);
};
exports.deleteCategory = async function (id) {
  return await categoryServices.deleteCategory(id);
};
exports.search = async function (keyword) {
  return await categoryServices.search(keyword);
};
