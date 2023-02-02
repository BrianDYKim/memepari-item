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
  '/:name',
  categoryMiddleware.checkDeletable,
  categoryController.deleteCategory
);

module.exports = categoryRouter;
