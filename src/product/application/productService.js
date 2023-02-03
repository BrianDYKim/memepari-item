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

    const createdProductResponse = {
      id: result.id,
      name: result.name,
      price: result.price,
      description: result.description,
      detailDescription: result.detailDescription,
      author: result.author,
      imageUrl: result.imageUrl,
      category: result.category,
    };

    return createdProductResponse;
  },

  async isAlreadyExistProductByName(name) {
    return await productDao.existsByName(name);
  },
  // getProduct 함수 만들기
  async getProduct(id) {
    const result = await productDao.getOneById(id);

    const getProductResponse = {
      name: result.name,
      price: result.price,
      description: result.description,
      detailDescription: result.detailDescription,
      author: result.author,
      imageUrl: result.imageUrl,
      category: result.category,
    };
    return getProductResponse;
  },
};

module.exports = productService;
