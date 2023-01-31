const dotenv = require('dotenv');

const { AppError } = require('../misc/AppError');
const { commonErrors } = require('../misc/commonErrors');

// Node Environment => 노드가 지금 production 환경? development 환경인가?
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(
  `어플리케이션을 다음의 환경으로 시작합니다: ${process.env.NODE_ENV}`
);

// .env 파일이 정의되어있는지?
const envFound = dotenv.config();
if (envFound.error) {
  throw new AppError(
    commonErrors.configError,
    500,
    "Couldn't find .env file on root folder"
  );
}

// mongoDBUrl을 config에서 정의
const mongoDbUrl = process.env.MONGODB_URL ?? 'mongodb://localhost:27017';

module.exports = {
  applicationName: process.env.APPLICATION_NAME || 'app',
  port: parseInt(process.env.PORT ?? '3000', 10),
  mongoDbUrl: mongoDbUrl,
};
