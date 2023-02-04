const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { orderService } = require('../../application');

const checkCreatable = (from) => async (req, res, next) => {};

module.exports = {
  checkCreatable,
};
