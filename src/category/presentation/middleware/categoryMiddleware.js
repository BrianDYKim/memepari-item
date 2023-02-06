const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { productService } = require('../../../product/application');
const { categoryService } = require('../../application');
const utils = require('../../../misc/utils');

const checkCreatable = (from) => async (req, res, next) => {
  const { name, description } = req[from];

  // name, description의 field 유효성 검사
  utils.validateStringsWhetherExists({ name, description }, from, next);

  // name, description이 각각 주어진 길이보다 긴지 유효성 검사 실시
  const validateInfoList = [
    { target: name, length: 30, targetName: 'name' },
    { target: description, length: 150, targetName: 'description' },
  ];
  validateInfoList.map(
    (validateInfo) => utils.validateStringLongerThanLength(validateInfo),
    from,
    next
  );

  const isDupicatedName = await categoryService.isAlreadyExistCategoryByName(
    name
  );

  if (isDupicatedName) {
    return next(
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

  utils.validateStringsWhetherExists({ name }, from, next);

  const foundCategory = await categoryService.findCategoryByName(name);

  if (!foundCategory) {
    return next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `해당 category 가 없습니다`
      )
    );
  }

  if (foundCategory.productCount > 0) {
    return next(
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
    return next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `해당 category 가 없습니다`
      )
    );
  }

  if (newName === undefined && description === undefined) {
    return next(
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
    return next(
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
