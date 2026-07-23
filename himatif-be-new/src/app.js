const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

dotenv.config();

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'development'
  ? ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4000']
  : process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static(path.join(__dirname, '../public/image')));
app.use(logger);

app.use(routes);
app.use(errorHandler);

module.exports = app;
