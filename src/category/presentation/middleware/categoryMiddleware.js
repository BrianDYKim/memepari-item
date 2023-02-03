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

const checkDeletable = async (req, res, next) => {
  const { name } = req.params;

  const foundCategory = await categoryService.findCategoryByName(name);

  if (!foundCategory) {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `해당 category 가 없습니다`
      )
    );
  }

  if (foundCategory.productCount > 0) {
    next(
      new AppError(
        commonErrors.remoteStorageError,
        400,
        '해당 category 에 상품이 존재하여 category를 삭제할 수 없습니다'
      )
    );
  }

  next();
};

module.exports = {
  checkCreatable,
  checkDeletable,
};
