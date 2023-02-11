const dotenv = require('dotenv');

const { AppError } = require('../misc/AppError');
const { commonErrors } = require('../misc/commonErrors');

// .env 파일이 정의되어있는지?
const envFound = dotenv.config();
if (envFound.error) {
  throw new AppError(
    commonErrors.configError,
    500,
    "Couldn't find .env file on root folder"
  );
}

process.env.PORT = process.env.PORT ?? 3500;

// Node Environment => 노드가 지금 production 환경? development 환경인가?
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(
  `어플리케이션을 다음의 환경으로 시작합니다: ${process.env.NODE_ENV}`
);

process.env.AUTH_SERVER_URL = process.env.AUTH_SERVER_URL ?? 'http://localhost:4000/api/users'

// mongoDBUrl을 config에서 정의
const mongoDbUrl = process.env.MONGODB_URL ?? 'mongodb://localhost:27017';

module.exports = {
  applicationName: process.env.APPLICATION_NAME || 'app',
  port: process.env.PORT,
  environment: process.env.NODE_ENV, 
  mongoDbUrl: mongoDbUrl,
  authServerUrl: process.env.AUTH_SERVER_URL
};
