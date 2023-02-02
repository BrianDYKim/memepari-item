const { categoryDao } = require('../domain');

const categoryService = {
  async findAllCategory() {
    // map 함수를 적극적으로 사용해보세요!
    return await categoryDao.findAll();
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
      description: result.description
    };

    return createCategoryResponse;
  },
  async isAlreadyExistCategoryByName(name) {
    return await categoryDao.existsByName(name);
  },
};

module.exports = categoryService;
