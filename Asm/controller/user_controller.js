var userService = require("../services/user_services");

exports.Register = async function (username, password) {
  let user = { userName: username, passWord: password };
  return await userService.Register(user);
};
exports.Login = async function (username) {
  return await userService.Login(username);
};
exports.getUserById = async function (id) {
  return await userService.getUserById(id);
};
exports.addToCart = function (product) {
  userService.addToCart(product);
};
exports.getCart = async function (name) {
  return await userService.getCart(name);
};
