const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const authorizationRoutes = require('./routes/authorizationRoutes');
const swaggerDocs = require('./config/swagger');

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de autorización
app.use('/api/authorization', authorizationRoutes);

// Documentación Swagger
swaggerDocs(app);

// Middleware de manejo de errores (opcional, si lo implementas después)
// app.use(errorHandler);

module.exports = app;
