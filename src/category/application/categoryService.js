const { categoryDao } = require('../domain');
const { productDao } = require('../../product/domain');

const categoryService = {
  async findById(id) {
    return await categoryDao.findOneById(id);
  },
  async findAllCategory() {
    const allCategoryDocuments = await categoryDao.findAll();

    const readCategoryResponseList = allCategoryDocuments.map((category) => ({
      id: category.id,
      name: category.name,
      productCount: category.productCount,
      description: category.description,
    }));

    return readCategoryResponseList;
  },
  async createNewCategory({ name, description }) {
    const productCount = 0;

    const result = await categoryDao.createCategory({
      name,
      productCount,
      description,
    });

    const createCategoryResponse = {
      id: result.id,
      name: result.name,
      productCount: result.productCount,
      description: result.description,
    };

    return createCategoryResponse;
  },
  async isAlreadyExistCategoryByName(name) {
    return await categoryDao.existsByName(name);
  },
  async findCategoryByName(name) {
    return await categoryDao.findOneByName(name);
  },
  async deleteCategoryByName(name) {
    const result = await categoryDao.findOneByName(name);
    const id = result.id;

    return await categoryDao.deleteOneById(id);
  },

  async updateCategoryByName({ oldName, newName, description }) {
    const result = await categoryDao.findOneByName(oldName);
    const id = result.id;

    return await categoryDao.updateOneById({ id, newName, description });
  },

  async updateProductCount(categoryId) {
    return await categoryDao.updateProductCountById(categoryId);
  },
};

module.exports = categoryService;
