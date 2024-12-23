const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authorizationRoutes = require('./routes/authorizationRoutes');
const swaggerDocs = require('./config/swagger');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

swaggerDocs(app);

app.use('/api/authorization', authorizationRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Authorization API running on port ${PORT}`);
});
