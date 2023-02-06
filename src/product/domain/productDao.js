const Product = require('./productSchema');
const utils = require('../../misc/utils');

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

  async updateOneById(id, changeQuery) {
    const targetProduct = await Product.findById(id);

    const updatedProduct = utils.changeModel(targetProduct, changeQuery);

    return await updatedProduct.save();
  },
  async getProductsByCategoryIdWithPagination(categoryId, page, limit) {
    const [totalCount, foundProducts] = await Promise.all([
      Product.find({ category: categoryId }).countDocuments(),
      Product.find({ category: categoryId })
        .sort({ createdAt: -1 })
        .skip(limit * (page - 1))
        .limit(limit),
    ]);

    const totalPage = Math.ceil(totalCount / limit);

    return {
      totalPage,
      totalCount,
      foundProducts,
    };
  },
};

module.exports = productDao;
