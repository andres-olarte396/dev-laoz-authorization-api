const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authorization API',
      version: process.env.API_VERSION,
      description: 'API RESTful para la gestión y validación de sesiones, tokens JWT y permisos de usuario. Permite validar el acceso a recursos protegidos mediante autorización basada en roles y permisos. Incluye endpoints seguros y documentación interactiva.',
      contact: {
        name: 'Andres Olarte',
        url: 'https://github.com/andres-olarte396',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta a tus archivos de rutas
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Documentación Swagger disponible en http://localhost:${process.env.PORT}/api-docs`);
};

module.exports = swaggerDocs;
