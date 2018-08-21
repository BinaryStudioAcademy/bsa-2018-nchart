const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const initializeAPIRoutes = require('./routes');
const dbConnect = require('./db/dbconnect');
const path = require('path');

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

const staticPath = path.resolve(`${__dirname}/../client/dist/client`);
app.use(express.static(staticPath));

initializeAPIRoutes(app);

// pre-sending middleware
app.use(successOrEmptyPayload);

// error handler
app.use(errorPayload);

module.exports = app;
