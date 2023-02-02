const express = require('express');
const categoryRouter = express.Router();

const { categoryController, categoryMiddleware } = require('../presentation');

categoryRouter.get('/', categoryController.findAllCategory);
categoryRouter.post(
  '/',
  categoryMiddleware.checkCreatable('body'),
  categoryController.createCategory
);

categoryRouter.delete(
  '/',
  categoryMiddleware.checkDeletable('body'),
  categoryController.deleteCategory
);

module.exports = categoryRouter;
