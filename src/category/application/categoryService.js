const { categoryDao } = require('../domain');
const { productDao } = require('../../product/domain');

const categoryService = {
  async findById(id) {
    return await categoryDao.findOneById(id);
  },
  async findAllCategory() {
    const allCategoryDocuments = await categoryDao.findAll();

    const readCategoryResponseList = allCategoryDocuments.map((category) =>
      entityToResponse(category)
    );

    return readCategoryResponseList;
  },
  async createNewCategory({ name, description }) {
    const productCount = 0;

    const result = await categoryDao.createCategory({
      name,
      productCount,
      description,
    });

    const createCategoryResponse = entityToResponse(result);

    return createCategoryResponse;
  },
  async isAlreadyExistCategoryByName(name) {
    return await categoryDao.existsByName(name);
  },
  async findCategoryByName(name) {
    return await categoryDao.findOneByName(name);
  },
  async deleteCategoryByName(name) {
    const foundCategory = await categoryDao.findOneByName(name);
    const deleteResult = await foundCategory.delete();

    return entityToResponse(deleteResult);
  },

  async updateCategoryByName({ oldName, newName, description }) {
    const { id } = await categoryDao.findOneByName(oldName);

    const updateResult = await categoryDao.updateOneById({
      id,
      newName,
      description,
    });

    return entityToResponse(updateResult);
  },

  async increaseProductCount(categoryId) {
    return await categoryDao.updateProductCountById(categoryId, 1);
  },

  async decreaseProductCount(categoryId) {
    return await categoryDao.updateProductCountById(categoryId, -1);
  },
};

function entityToResponse(category) {
  const { id, name, productCount, description } = category;

  return { id, name, productCount, description };
}

module.exports = categoryService;
