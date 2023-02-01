const Category  = require('./categorySchema');

const categoryDao = {
  async findAll() {
    return await Category.find({});
  },
};

module.exports = categoryDao;

