const Category = require('./categorySchema');
const utils = require('../../misc/utils');

const categoryDao = {
  async findAll() {
    return await Category.find({});
  },
  async createCategory({ name, productCount, description }) {
    const newCategory = new Category({ name, productCount, description });

    return await newCategory.save();
  },
  async existsByName(name) {
    const foundCategory = await Category.findOne({ name });

    return foundCategory ? true : false;
  },

  async findOneByName(name) {
    return await Category.findOne({ name });
  },
  async findOneById(id) {
    return await Category.findById(id);
  },

  async updateOneById({ id, newName, description }) {
    const targetCategory = await Category.findById(id);

    utils.changeModel(targetCategory, { name: newName, description });

    return await targetCategory.save();
  },
  async updateProductCountById(categoryId, count) {
    const targetProduct = await Category.findById(categoryId);

    targetProduct.productCount = targetProduct.productCount + count;

    return await targetProduct.save();
  },
};

module.exports = categoryDao;
