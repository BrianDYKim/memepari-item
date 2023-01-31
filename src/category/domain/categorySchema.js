const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  productCount: {
    type: Number,
    reuired: true,
  },
  description: {
    type: String,
    required: true,
  },
});

exports.Category = mongoose.model('Category', CategorySchema);
