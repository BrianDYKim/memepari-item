const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    reuired: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailDescription: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

exports.Product = mongoose.model('Product', ProductSchema);
