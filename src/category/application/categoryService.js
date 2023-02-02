const { categoryDao } = require('../domain');

const categoryService = {
  async findAllCategory() {
    const allCategoryDocuments = await categoryDao.findAll();

    const readCategoryResponseList = allCategoryDocuments.map(category => ({
      id: category.id,
      name: category.name,
      productCount: category.productCount,
      description: category.description
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
    const result = await categoryDao.findOne(name);
    const id = result.id;
    return await categoryDao.findOneById(id);
  },
  async deleteCategoryByName(name) {
    const result = await categoryDao.findOne(name)
    const id = result.id;
    // console.log('id:',id); // id: 63dbd407ec8c07458a87b158
    // console.log('_id:',result._id); //_id: new ObjectId("63dbd407ec8c07458a87b158")
    return await categoryDao.deleteCategory(id);
  }
};

module.exports = categoryService;
