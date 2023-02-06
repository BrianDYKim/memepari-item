const express = require('express');
const productRouter = express.Router();

const { productController, productMiddleware } = require('../presentation');

productRouter.get('/all', productController.findAllProduct);

productRouter.get(
  '/',
  productMiddleware.checkProductId('query'),
  productController.getProduct
);

productRouter.get(
  '/list',
  productMiddleware.checkReadableByCategory('query'),
  productController.getProductsByCategoryIdWithPagination
);

productRouter.post(
  '/',
  productMiddleware.checkCreatable('body'),
  productController.createProduct
);

productRouter.put(
  '/:id',
  productMiddleware.checkUpdatable('body'),
  productController.updateProduct
);

productRouter.delete('/:id', productMiddleware.checkDeletable('params'));

module.exports = productRouter;
