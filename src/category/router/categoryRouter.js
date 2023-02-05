const express = require('express');
const categoryRouter = express.Router();

const { categoryController, categoryMiddleware } = require('../presentation');
const authMiddleware = require('../../auth')

categoryRouter.get('/', categoryController.findAllCategory);
categoryRouter.post(
  '/',
  authMiddleware.checkAdminRole, 
  categoryMiddleware.checkCreatable('body'),
  categoryController.createCategory
);

categoryRouter.delete(
  '/:name',
  authMiddleware.checkAdminRole, 
  categoryMiddleware.checkDeletable('params'),
  categoryController.deleteCategory
);

categoryRouter.put(
  '/:name',
  authMiddleware.checkAdminRole, 
  categoryMiddleware.checkUpdatable('params'),
  categoryController.updateCategory
);

module.exports = categoryRouter;
