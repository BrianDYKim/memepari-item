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

productRouter.delete(
  '/:name',
  productMiddleware.checkDeletable('params'),
  productController.deleteProduct
);

module.exports = productRouter;
