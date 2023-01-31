const { productDao } = require('../domain');

const productService = {
  async findAllProducts() {
    return await productDao.findAll();
  },
};

module.exports = productService;
