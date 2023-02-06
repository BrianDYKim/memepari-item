const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { productService } = require('../../../product/application');
const { categoryService } = require('../../application');
const utils = require('../../../misc/utils');

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

const checkDeletable = (from) => async (req, res, next) => {
  const { name } = req[from];

  if (name === undefined || name.length === 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: category 이름이 올바르지 않습니다.`
      )
    );
  }

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

const checkUpdatable = (from) => async (req, res, next) => {
  const oldName = req[from].name;
  const { name: newName, description } = req.body;

  // oldName이 undefined 이거나, 혹은 길이가 0이면 에러를 일으키는 함수 호출
  utils.validateStringsWhetherExists({ oldName }, from, next);

  const foundCategory = await categoryService.findCategoryByName(oldName);

  if (!foundCategory) {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `해당 category 가 없습니다`
      )
    );
  }

  if (newName === undefined && description === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${req.body}: name, category 둘 중 하나는 입력이 되어야합니다`
      )
    );
  }

  // newName, description에 대해서 존재하는 경우 길이가 0인지 검증
  utils.validateStringsIfExists({ newName, description }, from, next);

  if (newName !== undefined) {
    utils.validateStringLongerThanLength(
      { target: newName, length: 30, targetName: 'newName' },
      from,
      next
    );
  }

  if (description !== undefined) {
    utils.validateStringLongerThanLength(
      { target: description, length: 150, targetName: 'description' },
      from,
      next
    );
  }

  const isDupicatedName = await categoryService.isAlreadyExistCategoryByName(
    newName
  );

  if (isDupicatedName) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${req.body}: 중복된 category 이름입니다`
      )
    );
  }
  next();
};

module.exports = {
  checkCreatable,
  checkDeletable,
  checkUpdatable,
};
