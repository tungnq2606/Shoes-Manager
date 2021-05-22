var categoryModel = require("../model/category_model");
var productModel = require("../model/product_model");

exports.getCategory = async function () {
  let list = await categoryModel.find();
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push({
      ID: i + 1,
      _id: list[i]._id,
      categoryName: list[i].categoryName,
    });
  }
  console.log(newList);
  return newList;
};
exports.addNewCategory = function (newCategory) {
  const model = new categoryModel(newCategory);
  model.save();
};
exports.getCategoryByID = async function (id) {
  let category = await categoryModel.findById(id);
  return category;
};
exports.editCategory = async function (id, newCatagory) {
  const model = await categoryModel.findById(id);
  if (model) {
    model.categoryName = newCatagory.categoryName;
    await model.save();
  }
};
exports.deleteCategory = async function (id) {
  let productList = await productModel.find({ category: id });
  if (productList.length > 0) {
    return false;
  }
  await categoryModel.remove({ _id: id });
  return true;
};
exports.search = async function (keyword) {
  let temp = await categoryModel.find();
  let newList = [];
  for (let i = 0; i < temp.length; i++) {
    newList.push({
      ID: i + 1,
      _id: temp[i]._id,
      categoryName: temp[i].categoryName,
    });
  }
  if (keyword == "false") {
    return newList;
  }
  return await newList.filter((s) =>
    s.categoryName.toLowerCase().includes(keyword.toLowerCase())
  );
};
