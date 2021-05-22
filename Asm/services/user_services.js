var userModel = require("../model/user_model");
var cartModel = require("../model/cart_model");
exports.Register = async function (us) {
  let user = new userModel(us);
  return await user.save();
};
exports.Login = async function (username) {
  return await userModel.findOne({ userName: username });
};
exports.getUserById = async function (id) {
  return await userModel.findOne({ _id: id }, "userName");
};
//
exports.addToCart = function (product) {
  const model = new cartModel(product);
  model.save();
};
//
exports.getCart = async function (name) {
  return await cartModel.find({ customer: name });
};
