const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const corsMiddleware = require('./middleware/cors');
const baseUrl = require('./middleware/baseURLBuilder');
const path = require('path');
const fs = require('fs');

dotenv.config();
connectDB();

const app = express();

app.use(corsMiddleware);
app.use(baseUrl);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

app.use('/api/uc/v3/users', require('./routes/authRoutes'));
app.use('/api/uc/v3/users/templates', require('./routes/templateRoutes'));
app.use('/api/uc/v3/entities', require('./routes/entityRoutes'));

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
