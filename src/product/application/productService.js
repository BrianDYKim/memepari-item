const { AppError } = require('../../misc/AppError');
const { commonErrors } = require('../../misc/commonErrors');
const { productDao } = require('../domain');

const productService = {
  async findAllProducts() {
    const allProductDocuments = await productDao.findAll();

    const readProductResponseList = allProductDocuments.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      author: product.author,
      imageUrl: product.imageUrl,
      category: product.category,
    }));

    return readProductResponseList;
  },

  async createNewProduct({
    name,
    price,
    description,
    detailDescription,
    author,
    imageUrl,
    category,
  }) {
    const result = await productDao.createProduct({
      name,
      price,
      description,
      detailDescription,
      author,
      imageUrl,
      category,
    });

    const createdProductResponse = entityToDetailResponse(result);

    return createdProductResponse;
  },

  async isAlreadyExistProductByName(name) {
    return await productDao.existsByName(name);
  },
  async getProduct(id) {
    const result = await productDao.getOneById(id);

    if (!result) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 상품이 존재하지 않습니다.'
      );
    }

    const detailProductResponse = entityToDetailResponse(result);

    return detailProductResponse;
  },
  async deleteProductById(id) {
    const deleteResult = await productDao.deleteById(id);

    return true;
  },
  async findById(id) {
    return await productDao.findById(id);
  },
};

function entityToDetailResponse(product) {
  const {
    id,
    name,
    price,
    description,
    detailDescription,
    author,
    imageUrl,
    category,
  } = product;

  const detailProductResponse = {
    id,
    name,
    price,
    description,
    detailDescription,
    author,
    imageUrl,
    category,
  };

  return detailProductResponse;
}

module.exports = productService;
