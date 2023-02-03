const express = require('express');
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

module.exports = productRouter;
