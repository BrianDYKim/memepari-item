const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: '5wesome-mall-item 백엔드 서버 문서',
      description: '밈팔이닷컴 item 서버 API 문서입니다',
    },
    servers: [
      {
        url: getBaseUrl(),
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          value: 'Bearer <JWT token here>',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/docs/category/*',
    './src/docs/product/*', 
    './src/category/router/categoryRouter.js',
    './src/product/router/productRouter.js',
  ],
};

const specs = swaggerJsdoc(options);

function getBaseUrl() {
  if (config.environment === 'development') {
    return `http://localhost:${config.port}`;
  }
  
  return `http://kdt-ai6-team05.elicecoding.com`
}

module.exports = {
  swaggerUi,
  specs,
};
