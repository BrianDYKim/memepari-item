const express = require('express');
const categoryRouter = express.Router(); 

const { categoryController, categoryMiddleware } = require('../presentation');

categoryRouter.get('/', categoryController.findAllCategory);

module.exports = categoryRouter;