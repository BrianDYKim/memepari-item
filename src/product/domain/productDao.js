const Product = require('./productSchema')
const utils = require('../../misc/utils')

const productDao = {
  async findAll() {
    return await Product.find({});
  },

  async createProduct({
    name,
    price,
    description,
    detailDescription,
    author,
    imageUrl,
    category,
  }) {
    const newProduct = new Product({
      name,
      price,
      description,
      detailDescription,
      author,
      imageUrl,
      category,
    });

    return await newProduct.save();
  },
  async existsByName(name) {
    const foundProduct = await Product.findOne({
      name,
    });
    return foundProduct ? true : false;
  },

  async getOneById(id) {
    return await Product.findById(id);
  },

  async deleteById(id) {
    return await Product.deleteOne({ id });
  },

  async findById(id) {
    return await Product.findById(id);
  },

  async updateOneById( id, toUpdate ) {
    const sanitizedToUpdate = utils.sanitizeObject({
      name: toUpdate.name,
      price: toUpdate.price,
      description: toUpdate.description,
      detailDescription: toUpdate.detailDescription,
      imageUrl: toUpdate.imageUrl,
    });

    const plainUpdateProduct = await Product.updateOne(
      { id }, 
      sanitizedToUpdate, 
      {
        runValidators: true,
        new: true,
      }
    ).lean();
    return plainUpdateProduct;
  },
};

module.exports = productDao;
