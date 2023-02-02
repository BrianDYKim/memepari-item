const Category = require('./categorySchema');

const categoryDao = {
  async findAll() {
    return await Category.find({});
  },
  async createCategory({ name, productCount, description }) {
    const newCategory = new Category({ name, productCount, description });

    return await newCategory.save();
  },
  /* exsits 행동 by 무슨 필드를 가지고 검증할 것인가? Name 이름으로 검증할거야 */
  async existsByName(name) {
    const foundCategory = await Category.findOne({ name });

    return foundCategory ? true : false;
  },
};

module.exports = categoryDao;
