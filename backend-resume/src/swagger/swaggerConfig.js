const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Resume API",
      version: "1.0.0",
      description: "API documentation for the backend-resume micro-service",
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
