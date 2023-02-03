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
  categoryMiddleware.checkDeletable('params'),
  categoryController.deleteCategory
);

categoryRouter.put(
  '/:name',
  categoryMiddleware.checkUpdatable,
  categoryController.updateCategory
);
// 생각해볼 것
// PUT 으로 요청할 schema의 모든 인자들을 검증할 수 있어서 PUT으로 처리하도록 함
// 만약 PUT 이 아닌 PATCH 로 처리할 경우, 로직을 어떻게 구현??

module.exports = categoryRouter;
