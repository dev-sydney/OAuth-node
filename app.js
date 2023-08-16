const express = require('express');
const cookieParser = require('cookie-parser');
const sessionsRouter = require('./routes/sessionRoutes');

const deserializeUser = require('./middleware/deserializeUser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(deserializeUser);

app.use('/api/v1/sessions', sessionsRouter);

module.exports = app;
