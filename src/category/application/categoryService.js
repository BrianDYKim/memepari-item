const { categoryDao } = require('../domain');

const categoryService = {
  async findAllCategory() {
    return await categoryDao.findAll();
  },
};

module.exports = categoryService; 
