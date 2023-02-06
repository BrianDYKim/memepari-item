const { Document } = require('mongoose');
const { AppError } = require('./AppError');
const { commonErrors } = require('./commonErrors');

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
 * 검증할 변수들이 존재하며, 존재한다면 길이가 0이 아닌지 검증하는 함수
 * @param {Object} validateProperties
 * @param {string} from
 * @param {import('express').NextFunction} next
 */
const validateStringsWhetherExists = (validateProperties, from, next) => {
  Object.entries(validateProperties).map(([key, value]) => {
    if (value === undefined || value.length === 0) {
      next(
        new AppError(
          commonErrors.inputError,
          400,
          `${key}: category 이름이 올바르지 않습니다.`
        )
      );
    }
  });
};

/**
 * 만약 존재하는 string에 대해서 validation을 수행해주는 유틸성 함수
 * @param {Object} validateProperties 검증한 변수를 모아둔 객체
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
 * 주어진 변수가 주어진 길이보다 긴지 검증하는 함수
 * @param {{target: any, length: number, targetName: string}} validateInfo 검증할 변수, 검증할 길이를 모아둔 객체
 * @param {string} from
 * @param {import('express').NextFunction} next
 */
const validateStringLongerThanLength = (validateInfo, from, next) => {
  const { target, length, targetName } = validateInfo;

  if (target.length > length) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${targetName}: 길이를 ${length}자 이내로 작성바랍니다`
      )
    );
  }
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

module.exports = {
  buildResponse,
  changeModel,
  validateStringsWhetherExists, 
  validateStringsIfExists,
  validateNumbersIfExists,
  validateStringLongerThanLength,
};
