const Product = require('./productSchema');

const productDao = {
  async findAll() {
    return await Product.find({});
  },
};

module.exports = productDao;
