const Category  = require('./categorySchema');

const categoryDao = {
  async findAll() {
    return await Category.find({});
  },
  async create({ name, productCount, description }){
    const category = new Category ({ name, productCount, description }); 
    await category.save(); 
    return category.toObject(); 
  },
};



module.exports = categoryDao;

