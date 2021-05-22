const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  id: { type: ObjectId },
  productName: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number },
  image: { type: String },
  size: { type: String },
  description: { type: String },
});
module.exports = mongoose.model("Product", productSchema);
