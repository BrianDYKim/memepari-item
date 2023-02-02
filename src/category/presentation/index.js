const { categoryController } = require('./controller/categoryController');
const categoryMiddleware = require('./middleware/categoryMiddleware');

module.exports = {
  categoryController,
  categoryMiddleware,
};
