const Category = require('./categorySchema');

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

  async deleteOneById(id) {
    return await Category.deleteOne({ id });
  },

  async updateOneById({ id, newName, description }) {
    const targetCategory = await Category.findById(id);

    const updateCategory = {
      name: newName ? newName : targetCategory.name,
      description: description ? description : targetCategory.description,
    };

    return await Category.findOneAndUpdate({ id }, updateCategory);
  },
  async updateProductCountById(categoryId) {
    const targetProduct = await Category.findById(categoryId);

    targetProduct.productCount = targetProduct.productCount + 1;

    return await targetProduct.save();
  },
};

module.exports = categoryDao;
