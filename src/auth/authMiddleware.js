const axios = require('axios');
const { AppError } = require('../misc/AppError');
const { commonErrors } = require('../misc/commonErrors');
const config = require('../config');

const baseUrl = config.authServerUrl;

const permissons = {
  USER: 'user',
  ADMIN: 'admin',
};

const checkRole = (permission) => async (req, res, next) => {
  try {
    const response = await axios.get(`${baseUrl}/auth/${permission}`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const responseBody = response.data;

    req.authResult = responseBody.data; // id, email을 req.authResult에 삽입

    next();
  } catch (error) {
    next(
      new AppError(commonErrors.authorizationError, 403, '권한이 없습니다.')
    );
  }
};

/**
 * header의 jwt 토큰을 이용해서 user 권한을 검사하는 함수
 * @returns {Promise<void>}
 */
const checkUserRole = checkRole(permissons.USER);
/**
 * header의 jwt 토큰을 이용해서 admin 권한을 검사하는 함수
 * @returns {Promise<void>}
 */
const checkAdminRole = checkRole(permissons.ADMIN);

module.exports = {
  checkUserRole,
  checkAdminRole,
};
