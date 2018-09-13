const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const initializeAPIRoutes = require('./routes');
const dbConnect = require('../db/dbconnect');

const {
	successOrEmptyPayload,
	errorPayload
} = require('./common/middleware/payload.middleware');

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
app.use(bodyParser.text());

initializeAPIRoutes(app);

const staticPath = path.resolve(`${__dirname}/../client/dist/client`);
app.use(express.static(staticPath));

// pre-sending middleware
app.use(successOrEmptyPayload);

// error handler
app.use(errorPayload);

app.use(bodyParser({ limit: '50mb' }));
module.exports = app;
