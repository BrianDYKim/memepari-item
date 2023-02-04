const http = require('http');
const express = require('express');
const categoryRouter = require('./category/router/categoryRouter');
const { productRouter } = require('./product/router');
const { orderRouter } = require('./order/router');

const loader = require('./loader');
const config = require('./config');
const { AppError } = require('./misc/AppError');
const { commonErrors } = require('./misc/commonErrors');
const utils = require('./misc/utils');

async function createApp() {
  // MongoDB에 연결
  await loader.connectMongoDB();

  const expressApp = express();

  // json
  expressApp.use(express.json());

  // Health check router
  expressApp.get('/health', (req, res) => {
    res.json({
      status: 'OK',
    });
  });

  // 여러분들이 정의하는 Router가 들어갈 자리
  expressApp.use('/api/v1/categories', categoryRouter);
  expressApp.use('/api/v1/products', productRouter);
  expressApp.use('/api/v1/orders', orderRouter);

  // 의도치 않은 주소로 들어오는 요청들은 모두 에러 처리를 해주면된다
  expressApp.use((req, res, next) => {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        404,
        'Resource Not Found'
      )
    );
  });

  expressApp.use((error, req, res, next) => {
    console.log(error);
    res.statusCode = error.httpCode ?? 500;
    res.json(utils.buildResponse(null, error.message));
  });

  // express랑 httpServer 따로 분리해서 관리
  const server = http.createServer(expressApp);

  const app = {
    start() {
      server.listen(config.port);
      server.on('listening', () => {
        console.log(`서버가 포트 ${config.port}에서 운영중입니다.`);
      });
    },
    stop() {
      console.log('서버 중지 작업을 시작합니다.');
      this.isShuttingDown = true;
      return new Promise((resolve, reject) => {
        server.close(async (error) => {
          if (error !== undefined) {
            console.log(
              `- HTTP 서버 중지를 실패해버렸습니다: ${error.message}`
            );
            reject(error);
          }

          console.log('- 들어오는 커넥션을 더 이상 받지 않겠습니다.');
          await loader.disconnectMongoDB();
          console.log('- DB 커넥션을 정상적으로 끊었습니다');
          console.log('서버 중지 작업을 성공적으로 마쳤습니다.');
          this.isShuttingDown = false;
          resolve();
        });
      });
    },
    isShuttingDown: false,
    _app: expressApp,
  };

  return app;
}

module.exports = createApp;
