const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
  id: { type: ObjectId },
  image: { type: String },
  productName: { type: String },
  price: { type: Number },
  size: { type: Number },
  date: { type: Date },
  customerName: { type: String },
});
module.exports = mongoose.model("Oder", categorySchema);
