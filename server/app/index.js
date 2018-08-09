const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const initializeAPIRoutes = require('./routes');
const dbConnect = require('./db/dbconnect');
const GeneratePayload = require('./common/middleware/payload.middleware');

dbConnect();

const app = express();

app.get('/*', (req, res, next) => {
	res.setHeader('Last-Modified', new Date().toUTCString());
	next();
});

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

initializeAPIRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	res.status(500).json(GeneratePayload.generateFailure(err));
	next();
});

module.exports = app;
