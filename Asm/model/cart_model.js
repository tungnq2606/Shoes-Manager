const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
  id: { type: ObjectId },
  customer: { type: String },
  image: { type: String },
  productName: { type: String },
  size: { type: Number },
  quality: { type: Number },
  total: { type: Number },
});
module.exports = mongoose.model("Cart", categorySchema);
