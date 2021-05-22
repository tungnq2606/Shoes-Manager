const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
  id: { type: ObjectId },
  userName: { type: String },
  passWord: { type: String },
});
module.exports = mongoose.model("User", categorySchema);
