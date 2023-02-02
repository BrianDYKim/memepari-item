const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { categoryService } = require('../../application');

const checkCreatable = (from) => async (req, res, next) => {
  const { name, description } = req[from];

  if (name === undefined || name.length === 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: category의 이름은 필수 값입니다`
      )
    );
  }

  if (description === undefined || description.length === 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: category의 설명은 필수 값입니다`
      )
    );
  }

  if (name.length > 30) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: category의 이름은 30글자 이내로 작성 부탁드립니다`
      )
    );
  }

  if (description.length > 150) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: category의 설명은 150글자 이내로 작성 부탁드립니다`
      )
    );
  }

  const isDupicatedName = await categoryService.isAlreadyExistCategoryByName(
    name
  );

  if (isDupicatedName) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 중복된 category 이름입니다`
      )
    );
  }

  next();
};

module.exports = {
  checkCreatable,
};
