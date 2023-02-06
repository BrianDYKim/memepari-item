const express = require('express');
const productRouter = express.Router();
const asyncHandler = require('../../misc/utils')

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

productRouter.delete('/:id', productMiddleware.checkDeletable('params'));

productRouter.put(
  '/:id',
  productMiddleware.checkUpdatable('body'),
  productController.updateProduct
);

productRouter.get('/', asyncHandler(async (req, res) => {
  if (req.query.write) {
    res.render('product/edit');
    return;
  }
  const page = Number(req.query.page || 1)
  const perPage = Number(req.query.perPage || 10)

  const [total, products] = await Promise.all([
    Product.countDocument({}),
    Product.find({})
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage),
  ]); 
  const totalPage = 
    Math.ceil(total / perpage);

    res.render('product/list', { products, page, perPgae, totalPage });
  })
);

module.exports = productRouter;
