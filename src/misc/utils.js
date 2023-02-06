const { Document } = require('mongoose');
const {AppError} = require('./AppError');
const {commonErrors} = require('./commonErrors');

/**
 * Model을 업데이트할 객체로 바꿔주는 유틸성 함수
 * @param {Document<any>} modelEntity
 * @param {any} changeQuery
 * @returns changedModelEntity: Document<any, any, any>
 */
const changeModel = (modelEntity, changeQuery) => {
  return Object.entries(changeQuery).reduce((model, [key, value]) => {
    model[key] = value ? value : model[key];

    return model;
  }, modelEntity);
};

const buildResponse = (data, errorMessage) => {
  return {
    error: errorMessage ?? null,
    data: data,
  };
};

/**
 * 만약 존재하는 string에 대해서 validation을 수행해주는 유틸성 함수
 * @param {Object} validateProperties
 * @param {string} from
 * @param {import("express").NextFunction} next
 */
const validateStringsIfExists = (validateProperties, from, next) => {
  Object.entries(validateProperties).map(([key, value]) => {
    if (value !== undefined && value.length === 0) {
      next(
        new AppError(
          commonErrors.inputError,
          400,
          `${from}: 주어진 ${key}이 올바르지 않습니다`
        )
      );
    }
  });
};

/**
 * 만약 존재하는 number에 대해서 validation을 수행해주는 유틸성 함수. 0 이하이면 next에 에러를 전달한다
 * @param {Object} validateProperties
 * @param {string} from
 * @param {import("express").NextFunction} next
 */
const validateNumbersIfExists = (validateProperties, from, next) => {
  Object.entries(validateProperties).map(([key, value]) => {
    if (value && value <= 0) {
      next(
        new AppError(
          commonErrors.inputError,
          400,
          `${from}: 주어진 ${key}이 올바르지 않습니다`
        )
      );
    }
  });
};

module.exports = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res);
    } catch (err) {
      next (err);
    }
  }
};


module.exports = {
  buildResponse,
  changeModel,
  validateStringsIfExists,
  validateNumbersIfExists,
};
