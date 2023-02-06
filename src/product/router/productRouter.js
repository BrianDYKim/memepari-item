const express = require('express');
const productRouter = express.Router();

const { productController, productMiddleware } = require('../presentation');
const authMiddleware = require('../../auth');

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
  authMiddleware.checkAdminRole,
  productMiddleware.checkCreatable('body'),
  productController.createProduct
);

productRouter.put(
  '/:id',
  authMiddleware.checkAdminRole,
  productMiddleware.checkUpdatable('body'),
  productController.updateProduct
);

productRouter.delete(
  '/:id',
  authMiddleware.checkAdminRole, 
  productMiddleware.checkDeletable('params'), 
  productController.deleteProduct
);

module.exports = productRouter;
