const { AppError } = require('../../misc/AppError');
const { commonErrors } = require('../../misc/commonErrors');
const { productDao } = require('../domain');
const { update } = require('../domain/productSchema');

const productService = {
  async findAllProducts() {
    const allProductDocuments = await productDao.findAll();

    const readProductResponseList = allProductDocuments.map((product) =>
      entityToSimpleResponse(product)
    );

    return readProductResponseList;
  },

  async createNewProduct({
    name,
    price,
    description,
    detailDescription,
    imageUrl,
    author,
    category,
  }) {
    const result = await productDao.createProduct({
      name,
      price,
      description,
      detailDescription,
      imageUrl,
      author,
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

    return entityToDetailResponse(deleteResult);
  },
  async findById(id) {
    const foundProduct = await productDao.findById(id);

    return foundProduct ? entityToDetailResponse(foundProduct) : null;
  },
  async updateProductById(
    id,
    { name, price, description, detailDescription, imageUrl }
  ) {
    const updatedProduct = await productDao.updateOneById(id, {
      name,
      price,
      description,
      detailDescription,
      imageUrl,
    });

    return entityToDetailResponse(updatedProduct);
  },
  async getProductsByCategoryIdWithPagination(categoryId, page, limit) {
    const { totalCount, totalPage, foundProducts } =
      await productDao.getProductsByCategoryIdWithPagination(
        categoryId,
        page,
        limit
      );

    if (foundProducts.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 페이지에 존재하는 품목이 존재하지 않습니다'
      );
    }

    const simpleResponses = foundProducts.map((product) =>
      entityToSimpleResponse(product)
    );

    return { totalCount, totalPage, result: simpleResponses };
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

function entityToSimpleResponse(product) {
  const { id, name, price, description, author, imageUrl, category } = product;

  const simpleResponse = { id, name, price, description, author, imageUrl, category };

  return simpleResponse;
}

module.exports = productService;
