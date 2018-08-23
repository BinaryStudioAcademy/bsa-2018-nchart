const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config();

// req.headers.authorization
const getUserFromToken = (req, res, next) => {
	if (req.headers.authorization) {
		const tokenSecret = process.env.TOKEN;
		const tokenPayload = req.headers.authorization;
		const decoded = jwt.decode(tokenPayload, tokenSecret);
		res.locals.user = _.omit(decoded, 'iat', 'exp');
		next();
		return res.locals.user;
	} return next();
};

module.exports = getUserFromToken;
