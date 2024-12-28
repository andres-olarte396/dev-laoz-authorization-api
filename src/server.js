const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authorizationRoutes = require('./routes/authorizationRoutes');
const swaggerDocs = require('./config/swagger');
const bodyParser = require('body-parser');

dotenv.config();
connectDB();

const app = express();
// Middleware para analizar JSON
app.use(bodyParser.json({ limit: '10mb' })); 
// Ajusta el límite si necesitas más
app.use(bodyParser.urlencoded({ extended: true }));

swaggerDocs(app);

app.use('/api/authorization', authorizationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Authorization API running on port ${PORT}`);
});
