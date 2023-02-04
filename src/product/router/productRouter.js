const express = require('express');
const { getProduct } = require('../application/productService');
const productRouter = express.Router();

const { productController, productMiddleware } = require('../presentation');

productRouter.get('/', productController.findAllProduct);
productRouter.post(
  '/',
  productMiddleware.checkCreatable('body'),
  productController.createProduct
);

productRouter.get(
  '/:id',
  productMiddleware.checkProductId('params'),
  productController.getProduct
);

productRouter.delete(
  '/:id',
  productMiddleware.checkDeletable('params'),
  productController.deleteProduct
);

module.exports = productRouter;
