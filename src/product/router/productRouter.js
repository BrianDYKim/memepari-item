const express = require('express');
const { Router } = require('express');

const { productController, productMiddleware } = require('../presentation');

const productRouter = Router();

productRouter.get('/', productController.findAllProduct);

module.exports = productRouter;
